import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { LanguageOnboarding } from './src/components/LanguageOnboarding';
import { HomeScreen } from './src/screens/HomeScreen';
import { LearnScreen } from './src/screens/LearnScreen';
import { TranslateScreen } from './src/screens/TranslateScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { useAppStore } from './src/store/useAppStore';

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Learn') {
            iconName = 'book-open-variant';
          } else if (route.name === 'Translate') {
            iconName = 'translate';
          } else if (route.name === 'Profile') {
            iconName = 'account';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1f6feb',
        tabBarInactiveTintColor: '#57606a',
        headerShown: true,
        headerStyle: { backgroundColor: '#f6f8fa' },
        headerTitleStyle: { fontSize: 20, fontWeight: '700', color: '#24292f' },
        tabBarStyle: {
          height: 64,
          paddingBottom: 10,
          paddingTop: 6,
          backgroundColor: '#ffffff',
          borderTopColor: '#d0d7de',
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="Learn" component={LearnScreen} options={{ title: 'Learn' }} />
      <Tab.Screen name="Translate" component={TranslateScreen} options={{ title: 'Translate' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  const onboardingComplete = useAppStore((s) => s.onboardingComplete ?? false);
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
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1f6feb" />
      </View>
    );
  }

  if (!onboardingComplete) {
    return <LanguageOnboarding />;
  }

  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f8fa',
  },
});
