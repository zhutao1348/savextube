import { useCallback, useEffect, useState } from 'react';
import { Alert, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { controlLiveRoom, controlSubscription, listHistory, listLiveRooms, listSubscriptions, loadServerUrl } from '@/src/services/api';

export type ResourceKind = 'history' | 'subscriptions' | 'live';
const titles = { history: '历史', subscriptions: '订阅', live: '直播' };

export function ResourceList({ kind }: { kind: ResourceKind }) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const server = await loadServerUrl();
      const data = kind === 'history' ? await listHistory(server) : kind === 'subscriptions' ? await listSubscriptions(server) : await listLiveRooms(server);
      setItems(Array.isArray(data) ? data : data?.items ?? data?.history ?? data?.subscriptions ?? data?.rooms ?? []);
    } catch { Alert.alert('加载失败', '请确认已经登录并具有访问权限。'); }
    finally { setLoading(false); }
  }, [kind]);
  useEffect(() => { void load(); }, [load]);
  const act = async (id: string, action: string) => {
    try {
      const server = await loadServerUrl();
      if (kind === 'subscriptions') await controlSubscription(server, id, action as 'run'|'toggle');
      if (kind === 'live') await controlLiveRoom(server, id, action as 'start'|'stop');
      await load();
    } catch { Alert.alert('操作失败'); }
  };
  return <ScrollView style={s.page} refreshControl={<RefreshControl refreshing={loading} onRefresh={() => { void load(); }} />}>
    <Text style={s.title}>{titles[kind]}</Text>
    {items.length === 0 ? <Text style={s.empty}>{loading ? '加载中...' : '暂无内容'}</Text> : items.map((item, index) => {
      const id = String(item.id ?? item.history_id ?? index);
      return <View style={s.card} key={id}><Text style={s.cardTitle}>{item.title ?? item.name ?? item.url ?? '未命名内容'}</Text><Text style={s.meta}>{item.status ?? item.platform ?? item.created_at ?? ''}</Text>
        {kind === 'subscriptions' && <View style={s.actions}><Pressable onPress={() => { void act(id, 'run'); }}><Text style={s.action}>立即运行</Text></Pressable><Pressable onPress={() => { void act(id, 'toggle'); }}><Text style={s.action}>启用/停用</Text></Pressable></View>}
        {kind === 'live' && <View style={s.actions}><Pressable onPress={() => { void act(id, 'start'); }}><Text style={s.action}>开始录制</Text></Pressable><Pressable onPress={() => { void act(id, 'stop'); }}><Text style={s.danger}>停止</Text></Pressable></View>}
      </View>;
    })}
  </ScrollView>;
}
const s=StyleSheet.create({page:{flex:1,padding:20,backgroundColor:'#f5f7fb'},title:{fontSize:32,fontWeight:'800',color:'#172033'},empty:{textAlign:'center',marginTop:100,color:'#657187'},card:{backgroundColor:'#fff',padding:16,borderRadius:8,marginTop:12},cardTitle:{fontSize:16,fontWeight:'700',color:'#172033'},meta:{fontSize:13,color:'#657187',marginTop:7},actions:{flexDirection:'row',gap:22,marginTop:14},action:{color:'#2f7df6',fontWeight:'700'},danger:{color:'#dc3f3f',fontWeight:'700'}});
