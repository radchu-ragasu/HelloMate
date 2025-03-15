import React, { useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  TouchableOpacity,
  Dimensions,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { ChatMessage, Message } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';

// Get screen dimensions
const { height: screenHeight } = Dimensions.get('window');

interface ChatUIProps {
  messages: Message[];
  onSend: (text: string) => void;
  isTyping?: boolean;
  placeholder?: string;
  onNewChat: () => void;
}

export const ChatUI: React.FC<ChatUIProps> = ({ 
  messages, 
  onSend, 
  isTyping = false,
  placeholder,
  onNewChat
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleSend = (text: string) => {
    onSend(text);
    // Scroll to bottom after sending message
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        <View style={styles.chatContentContainer}>
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          >
            {messages.map(message => (
              <ChatMessage
                key={message._id}
                message={message}
                isUser={message.user._id === 1}
              />
            ))}
            {messages.length === 0 && (
              <View style={styles.emptyContainer}>
                <ThemedText style={styles.emptyText}>
                  Start a conversation with HelloMate!
                </ThemedText>
              </View>
            )}
          </ScrollView>

          <View style={styles.inputContainer}>
            <ChatInput
              onSend={handleSend}
              isTyping={isTyping}
              placeholder={placeholder}
            />
            
            <TouchableOpacity 
              style={[
                styles.newChatButton,
                { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7' }
              ]} 
              onPress={onNewChat}
            >
              <Ionicons 
                name="add-circle-outline" 
                size={24} 
                color={isDark ? '#FFFFFF' : '#000000'} 
              />
              <ThemedText style={styles.newChatText}>New Chat</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: screenHeight,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  chatContentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  messagesContainer: {
    flex: 1,
    width: '100%',
  },
  messagesContent: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  inputContainer: {
    width: '100%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: screenHeight * 0.7,
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.6,
    textAlign: 'center',
  },
  newChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  newChatText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
}); 