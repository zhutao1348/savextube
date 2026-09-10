import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const rows=[['history','历史','time-outline'],['subscriptions','订阅','radio-outline'],['live','直播','recording-outline'],['logs','日志','terminal-outline'],['monitor','监控','stats-chart-outline']] as const;
export default function More(){return <View style={s.page}><Text style={s.header}>更多</Text><View style={s.list}>{rows.map(([path,title,icon])=><Pressable key={path} style={s.row} onPress={()=>router.push(`/${path}` as never)}><Ionicons name={icon} size={24} color="#2f7df6"/><Text style={s.title}>{title}</Text><Ionicons name="chevron-forward" size={20} color="#b8bec8"/></Pressable>)}</View></View>}
const s=StyleSheet.create({page:{flex:1,backgroundColor:'#fff',paddingTop:24},header:{fontSize:22,fontWeight:'800',textAlign:'center',color:'#111827',marginBottom:14},list:{borderTopWidth:1,borderColor:'#e5e7eb'},row:{height:62,flexDirection:'row',alignItems:'center',paddingHorizontal:22,borderBottomWidth:1,borderColor:'#e5e7eb'},title:{flex:1,fontSize:18,color:'#111827',marginLeft:18}});
