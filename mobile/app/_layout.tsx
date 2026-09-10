import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return <Tabs screenOptions={{ tabBarActiveTintColor: '#2f7df6', headerStyle: { backgroundColor: '#f7f9fc' }, headerShadowVisible: false }}>
    <Tabs.Screen name="index" options={{ title: '下载', tabBarIcon: ({ color, size }) => <Ionicons name="download-outline" size={size} color={color} /> }} />
    <Tabs.Screen name="tasks" options={{ title: '任务', tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" size={size} color={color} /> }} />
    <Tabs.Screen name="library" options={{ title: '内容库', tabBarIcon: ({ color, size }) => <Ionicons name="folder-open-outline" size={size} color={color} /> }} />
    <Tabs.Screen name="account" options={{ title: '账户', tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} /> }} />
    <Tabs.Screen name="settings" options={{ title: '设置', tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} /> }} />
  </Tabs>;
}
