import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { loadServerUrl, submitDownload } from '@/src/services/api';

export default function DownloadScreen() {
  const [url, setUrl] = useState('');
  const [server, setServer] = useState('');
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => { let active = true; void loadServerUrl().then(value => { if (active) setServer(value); }); return () => { active = false; }; }, []);
  const submit = async () => {
    if (!url.trim()) { Alert.alert('请输入链接'); return; }
    if (!server) { Alert.alert('尚未配置服务端', '请先打开“设置”填写服务端地址。'); return; }
    setSubmitting(true);
    try { await submitDownload(server, url); setUrl(''); Alert.alert('已加入任务', '服务端已收到下载请求。'); }
    catch { Alert.alert('提交失败', '无法连接服务端，请检查地址和网络。'); }
    finally { setSubmitting(false); }
  };
  return <ScrollView contentContainerStyle={styles.page}>
    <Text style={styles.eyebrow}>SaveXTube</Text><Text style={styles.title}>下载你想保存的内容</Text>
    <Text style={styles.muted}>支持视频、音乐、图片和磁力链接</Text>
    <View style={styles.panel}><Text style={styles.label}>内容链接</Text><TextInput value={url} onChangeText={setUrl} placeholder="粘贴 URL 或磁力链接" placeholderTextColor="#8a95a5" autoCapitalize="none" autoCorrect={false} style={styles.input} /><Pressable disabled={submitting} onPress={()=>{void submit()}} style={[styles.button, submitting && styles.buttonDisabled]}><Text style={styles.buttonText}>{submitting ? '提交中…' : '开始下载'}</Text></Pressable></View>
    <Text style={styles.section}>快捷入口</Text><View style={styles.quickRow}>{['YouTube','Bilibili','音乐','图片'].map(item => <View key={item} style={styles.quick}><Text style={styles.quickText}>{item}</Text></View>)}</View>
  </ScrollView>;
}
const styles=StyleSheet.create({page:{padding:24,backgroundColor:'#f7f9fc',flexGrow:1},eyebrow:{fontSize:14,fontWeight:'700',color:'#2f7df6',letterSpacing:1},title:{fontSize:30,fontWeight:'800',color:'#172033',marginTop:10},muted:{fontSize:15,color:'#657187',marginTop:8},panel:{backgroundColor:'#fff',borderRadius:10,padding:18,marginTop:28,borderWidth:1,borderColor:'#e5eaf2'},label:{fontSize:14,fontWeight:'700',color:'#344054'},input:{height:50,borderWidth:1,borderColor:'#d8dfeb',borderRadius:8,paddingHorizontal:14,marginTop:10,fontSize:15,color:'#172033'},button:{height:50,borderRadius:8,backgroundColor:'#2f7df6',alignItems:'center',justifyContent:'center',marginTop:12},buttonDisabled:{opacity:0.65},buttonText:{color:'#fff',fontSize:16,fontWeight:'700'},section:{fontSize:17,fontWeight:'800',color:'#172033',marginTop:28},quickRow:{flexDirection:'row',gap:10,marginTop:12,flexWrap:'wrap'},quick:{backgroundColor:'#eaf2ff',paddingVertical:12,paddingHorizontal:16,borderRadius:8},quickText:{color:'#245fc4',fontWeight:'700'}});
