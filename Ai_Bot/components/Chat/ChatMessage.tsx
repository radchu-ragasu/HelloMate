import React from 'react';
import { View, Text, StyleSheet, Image, useColorScheme } from 'react-native';
import { ThemedText } from '../ThemedText';

export interface Message {
  _id: string | number;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name?: string;
    avatar?: string;
  };
}

interface ChatMessageProps {
  message: Message;
  isUser: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[
      styles.container,
      isUser ? styles.userContainer : styles.botContainer
    ]}>
      {!isUser && message.user.avatar && (
        <Image 
          source={{ uri: message.user.avatar }} 
          style={styles.avatar} 
        />
      )}
      <View style={[
        styles.bubble,
        isUser 
          ? styles.userBubble 
          : [
              styles.botBubble,
              { backgroundColor: isDark ? '#2C2C2E' : '#E9E9EB' }
            ]
      ]}>
        <ThemedText style={[
          styles.messageText,
          isUser ? styles.userText : styles.botText
        ]}>
          {message.text}
        </ThemedText>
        <Text style={[
          styles.timestamp,
          isUser ? styles.userTimestamp : [styles.botTimestamp, { color: isDark ? '#ADADAD' : '#8E8E93' }]
        ]}>
          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  botContainer: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 2,
  },
  userBubble: {
    backgroundColor: '#0D8ABC',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    marginLeft: 10,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#FFFFFF',
  },
  botText: {
    color: undefined, // Handled by ThemedText
  },
  timestamp: {
    fontSize: 12,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  botTimestamp: {
    color: '#8E8E93',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
}); 