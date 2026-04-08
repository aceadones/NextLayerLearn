import React, { useState, useRef } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { useAudio } from '../hooks/useAudio';
import { useTeachingPipeline } from '../hooks/useTeachingPipeline';
import { sarvamSTT } from '../services/sarvamSTT';
import { Typography } from '../components/ui/Typography';
import { HoldToSpeakButton } from '../components/ui/HoldToSpeakButton';
import { t } from '../utils/localization';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const ChatScreen = () => {
  const { language, chatHistory, isLoading, setIsLoading, highContrast } = useAppStore();
  const { startRecording, stopRecording, playAudio, isRecording } = useAudio();
  const { teachFromUserText } = useTeachingPipeline(playAudio);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSendText = async () => {
    if (!inputText.trim() || isLoading) return;
    const text = inputText;
    setInputText('');
    await teachFromUserText(text);
  };

  const handlePressIn = async () => {
    await startRecording();
  };

  const handlePressOut = async () => {
    const audioUri = await stopRecording();
    if (audioUri) {
      processRecordedAudio(audioUri);
    }
  };

  const processRecordedAudio = async (audioUri: string) => {
    setIsLoading(true);
    try {
      const text = await sarvamSTT(audioUri, language);
      if (!text) {
        Alert.alert('Could not hear clearly', 'Please hold the mic and speak again.');
        return;
      }
      await teachFromUserText(text);
    } catch (error) {
      Alert.alert('Error', 'Failed to process audio.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 border-b border-card">
        <Typography variant="h2" className="font-bold text-primary">
          {t('tabChat', language)}
        </Typography>
        <TouchableOpacity onPress={() => useAppStore.getState().clearHistory()}>
          <Icon name="delete-outline" size={32} color={highContrast ? '#ffffff' : '#A3BBD9'} />
        </TouchableOpacity>
      </View>

      {/* Chat Messages */}
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        className="flex-1 px-4 py-6"
      >
        {chatHistory.length === 0 && (
          <View className="flex-1 justify-center items-center mt-20">
            <Icon name="chat-processing-outline" size={80} color={highContrast ? '#ffffff' : '#A3BBD9'} className="opacity-50" />
            <Typography variant="h3" className="text-center mt-4 opacity-50">
              Start a conversation...
            </Typography>
          </View>
        )}

        {chatHistory.map((msg, idx) => {
          const isUser = msg.role === 'user';
          return (
            <View key={idx} className={`mb-6 flex-row ${isUser ? 'justify-end' : 'justify-start'}`}>
              {!isUser && (
                <View className="mr-3 mt-1">
                  <Icon name="robot" size={32} color={highContrast ? '#ffffff' : '#A3BBD9'} />
                </View>
              )}
              <View
                className={`max-w-[80%] rounded-3xl p-5 ${
                  isUser
                    ? (highContrast ? 'bg-white' : 'bg-primary')
                    : (highContrast ? 'bg-gray-800 border border-white' : 'bg-card')
                }`}
              >
                <Typography
                  variant="h3"
                  className={
                    isUser
                      ? (highContrast ? 'text-black' : 'text-background')
                      : (highContrast ? 'text-white' : 'text-primary')
                  }
                >
                  {msg.content}
                </Typography>
              </View>
              {isUser && (
                <View className="ml-3 mt-1">
                  <Icon name="account" size={32} color={highContrast ? '#ffffff' : '#A3BBD9'} />
                </View>
              )}
            </View>
          );
        })}

        {isLoading && (
          <View className="flex-row justify-start mb-6">
            <View className="mr-3 mt-1">
              <Icon name="robot" size={32} color={highContrast ? '#ffffff' : '#A3BBD9'} />
            </View>
            <View className={`rounded-3xl p-5 ${highContrast ? 'bg-gray-800 border border-white' : 'bg-card'}`}>
              <ActivityIndicator size="small" color={highContrast ? '#ffffff' : '#A3BBD9'} />
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View className={`flex-row items-center px-4 py-4 border-t ${highContrast ? 'border-white bg-black' : 'border-card bg-background'}`}>
        <TextInput
          className={`flex-1 rounded-full px-6 py-4 text-xl mr-4 ${highContrast ? 'bg-gray-900 text-white border-2 border-white' : 'bg-card text-primary'}`}
          placeholder="Type a message..."
          placeholderTextColor={highContrast ? '#cccccc' : '#64748b'}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSendText}
        />
        {inputText.trim() ? (
          <TouchableOpacity
            onPress={handleSendText}
            className={`rounded-full p-4 ${highContrast ? 'bg-white' : 'bg-primary'}`}
          >
            <Icon name="send" size={32} color={highContrast ? '#000000' : '#121922'} />
          </TouchableOpacity>
        ) : (
          <HoldToSpeakButton
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            isRecording={isRecording}
            size={64}
          />
        )}
      </View>
    </View>
  );
};
