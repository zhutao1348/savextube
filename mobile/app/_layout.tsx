import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return <Tabs screenOptions={{ tabBarActiveTintColor: '#2f7df6', headerStyle: { backgroundColor: '#f7f9fc' }, headerShadowVisible: false }}>
    <Tabs.Screen name="index" options={{ title: '下载', tabBarIcon: ({ color, size }) => <Ionicons name="download-outline" size={size} color={color} /> }} />
    <Tabs.Screen name="tasks" options={{ title: '任务', tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" size={size} color={color} /> }} />
    <Tabs.Screen name="settings" options={{ title: '设置', tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} /> }} />
  </Tabs>;
}
