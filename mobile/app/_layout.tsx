import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return <Tabs screenOptions={{ tabBarActiveTintColor: '#2f7df6', headerShown: false }}>
    <Tabs.Screen name="index" options={{ title: '首页', tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} /> }} />
    <Tabs.Screen name="tasks" options={{ title: '下载', tabBarIcon: ({ color, size }) => <Ionicons name="arrow-down-circle-outline" size={size} color={color} /> }} />
    <Tabs.Screen name="library" options={{ title: '文件', tabBarIcon: ({ color, size }) => <Ionicons name="folder-outline" size={size} color={color} /> }} />
    <Tabs.Screen name="settings" options={{ title: '设置', tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} /> }} />
    <Tabs.Screen name="more" options={{ title: '更多', tabBarIcon: ({ color, size }) => <Ionicons name="ellipsis-horizontal" size={size} color={color} /> }} />
    {['account','logs','monitor','history','subscriptions','live'].map(name => <Tabs.Screen key={name} name={name} options={{ href: null }} />)}
  </Tabs>;
}
