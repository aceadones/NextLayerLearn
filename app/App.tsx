import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { OnboardingFlow } from './src/components/OnboardingFlow';
import { HomeScreen } from './src/screens/HomeScreen';
import { LearnScreen } from './src/screens/LearnScreen';
import { TranslateScreen } from './src/screens/TranslateScreen';
import { ChatScreen } from './src/screens/ChatScreen';
import { useAppStore } from './src/store/useAppStore';
import { t } from './src/utils/localization';

const Tab = createBottomTabNavigator();

function MainTabs() {
  const { language, highContrast } = useAppStore();

  const bgColor = highContrast ? '#000000' : '#121922';
  const activeColor = highContrast ? '#ffffff' : '#A3BBD9';
  const inactiveColor = highContrast ? '#666666' : '#475569';

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Learn') iconName = 'book-open-variant';
          else if (route.name === 'Translate') iconName = 'translate';
          else if (route.name === 'Chat') iconName = 'chat-processing';
          
          return <Icon name={iconName} size={32} color={color} />;
        },
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: false,
        tabBarStyle: {
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
          backgroundColor: bgColor,
          borderTopWidth: 1,
          borderTopColor: highContrast ? '#333333' : '#1e293b',
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: t('tabHome', language) }} 
      />
      <Tab.Screen 
        name="Learn" 
        component={LearnScreen} 
        options={{ title: t('tabLearn', language) }} 
      />
      <Tab.Screen 
        name="Translate" 
        component={TranslateScreen} 
        options={{ title: t('tabTranslate', language) }} 
      />
      <Tab.Screen 
        name="Chat" 
        component={ChatScreen} 
        options={{ title: t('tabChat', language) }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const onboardingComplete = useAppStore((s) => s.onboardingComplete ?? false);
  const highContrast = useAppStore((s) => s.highContrast);
  const [hydrated, setHydrated] = useState(useAppStore.persist.hasHydrated());

  useEffect(() => {
    if (useAppStore.persist.hasHydrated()) {
      setHydrated(true);
    }
    const unsub = useAppStore.persist.onFinishHydration(() => setHydrated(true));
    return unsub;
  }, []);

  if (!hydrated) {
    return (
      <View className={`flex-1 justify-center items-center ${highContrast ? 'bg-black' : 'bg-background'}`}>
        <ActivityIndicator size="large" color="#A3BBD9" />
      </View>
    );
  }

  if (!onboardingComplete) {
    return <OnboardingFlow />;
  }

  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}
