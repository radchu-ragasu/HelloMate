import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  useColorScheme,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../ThemedText';

interface ChatInputProps {
  onSend: (text: string) => void;
  placeholder?: string;
  isTyping?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSend, 
  placeholder = 'Type your message here...', 
  isTyping 
}) => {
  const [text, setText] = useState('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText('');
    }
  };

  return (
    <View style={[
      styles.container,
      { borderTopColor: isDark ? '#38383A' : '#E5E5EA' }
    ]}>
      {isTyping && (
        <View style={styles.typingIndicator}>
          <ThemedText style={styles.typingText}>HelloMate is typing...</ThemedText>
        </View>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            { 
              backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7',
              color: isDark ? '#FFFFFF' : '#000000'
            }
          ]}
          value={text}
          onChangeText={setText}
          placeholder={placeholder}
          placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
          multiline
          maxLength={1000}
        />
        <TouchableOpacity 
          style={[
            styles.sendButton,
            { opacity: text.trim() ? 1 : 0.5 }
          ]} 
          onPress={handleSend}
          disabled={!text.trim()}
        >
          <ThemedText style={styles.sendText}>Send</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    padding: 8,
  },
  typingIndicator: {
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  typingText: {
    fontSize: 12,
    fontStyle: 'italic',
    opacity: 0.7,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    maxHeight: 120,
    fontSize: 16,
    ...Platform.select({
      ios: {
        paddingTop: 12,
        paddingBottom: 12,
      },
      android: {
        paddingTop: 8,
        paddingBottom: 8,
      },
    }),
  },
  sendButton: {
    marginLeft: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  sendText: {
    color: '#0D8ABC',
    fontWeight: '600',
    fontSize: 17,
  },
}); 