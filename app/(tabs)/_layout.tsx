import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#74c4fe' }}>
      <Tabs.Screen
        name="explore"
        options={{ title: 'Explorar' }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Cadastrar Causa' }}
      />
    </Tabs>
  );
}