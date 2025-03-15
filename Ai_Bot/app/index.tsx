import React, { useState, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { GoogleGenerativeAI } from '@google/generative-ai';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedView } from '../components/ThemedView';
import { ChatUI, Message } from '../components/Chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });


// Bot configuration
const BOT_USER = {
  _id: 2,
  name: 'HelloMate',
  avatar: 'https://ui-avatars.com/api/?name=Hello+Mate&background=0D8ABC&color=fff'
};

// System prompt for the AI
const SYSTEM_PROMPT = `You are HelloMate, an AI assistant specialized in helping people who have recently relocated find local services like plumbing, carpentry, etc. Your goal is to:
1. Help users describe their service needs clearly
2. Ask relevant questions about specific problems
3. Gather important details like location, urgency, and budget
4. Provide general cost estimates when possible
5. Offer basic DIY tips for minor issues
6. Suggest questions to ask service providers

Always be friendly, clear, and professional in your responses.`;

interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const insets = useSafeAreaInsets();
  const chatHistory = useRef<ChatMessage[]>([
    { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
    { role: 'model', parts: [{ text: "I understand. I'll help users find local services while following those guidelines." }] }
  ]);

  const startNewChat = async () => {
    try {
      // Clear AsyncStorage
      await AsyncStorage.removeItem('chat_messages');
      
      // Reset chat history
      chatHistory.current = [
        { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
        { role: 'model', parts: [{ text: "I understand. I'll help users find local services while following those guidelines." }] }
      ];
      
      // Reset messages with initial greeting
      setMessages([{
        _id: 1,
        text: 'Hello! I\'m HelloMate, your personal assistant for finding local services. How can I help you today?',
        createdAt: new Date(),
        user: BOT_USER,
      }]);
    } catch (error) {
      console.error('Error clearing chat:', error);
    }
  };

  useEffect(() => {
    // Load chat history
    loadMessages();
    
    // Add initial greeting if no messages
    if (messages.length === 0) {
      setMessages([
        {
          _id: 1,
          text: 'Hello! I\'m HelloMate, your personal assistant for finding local services. How can I help you today?',
          createdAt: new Date(),
          user: BOT_USER,
        },
      ]);
    }
  }, []);

  const loadMessages = async () => {
    try {
      const savedMessages = await AsyncStorage.getItem('chat_messages');
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages);
        
        // Rebuild chat history from saved messages
        chatHistory.current = [
          { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
          { role: 'model', parts: [{ text: "I understand. I'll help users find local services while following those guidelines." }] }
        ];
        
        parsedMessages.slice().reverse().forEach((msg: Message) => {
          chatHistory.current.push({
            role: msg.user._id === 1 ? 'user' : 'model',
            parts: [{ text: msg.text }]
          });
        });
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const saveMessages = async (newMessages: Message[]) => {
    try {
      await AsyncStorage.setItem('chat_messages', JSON.stringify(newMessages));
    } catch (error) {
      console.error('Error saving messages:', error);
    }
  };

  const handleSend = useCallback(async (text: string) => {
    const userMessage: Message = {
      _id: Math.random().toString(),
      text,
      createdAt: new Date(),
      user: {
        _id: 1,
      },
    };

    // Update messages
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    saveMessages(updatedMessages);

    setIsTyping(true);

    try {
      const prompt = SYSTEM_PROMPT + "\n\nPrevious messages:\n" + 
        chatHistory.current.slice(2).map(msg => 
          `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.parts[0].text}`
        ).join("\n") + 
        "\n\nCurrent message:\n" + text;

      const result = await model.generateContent([
        { text: prompt }
      ]);
      
      const response = await result.response;
      const responseText = response.text();

      // Add messages to chat history
      chatHistory.current.push(
        { role: 'user', parts: [{ text }] },
        { role: 'model', parts: [{ text: responseText }] }
      );

      const aiMessage: Message = {
        _id: Math.random().toString(),
        text: responseText,
        createdAt: new Date(),
        user: BOT_USER,
      };

      const newUpdatedMessages = [...updatedMessages, aiMessage];
      setMessages(newUpdatedMessages);
      saveMessages(newUpdatedMessages);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        _id: Math.random().toString(),
        text: 'I apologize, but I encountered an error. Please try again.',
        createdAt: new Date(),
        user: BOT_USER,
      };
      
      const newUpdatedMessages = [...updatedMessages, errorMessage];
      setMessages(newUpdatedMessages);
      saveMessages(newUpdatedMessages);
    }

    setIsTyping(false);
  }, [messages]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ThemedView style={styles.container}>
        <ChatUI
          messages={messages}
          onSend={handleSend}
          isTyping={isTyping}
          placeholder="Type your message here..."
          onNewChat={startNewChat}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
}); 