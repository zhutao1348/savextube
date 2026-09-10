import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { currentUser, loadServerUrl, login, logout } from '@/src/services/api';

type User={username?:string;role?:string};
export default function AccountScreen(){
  const [user,setUser]=useState<User|null>(null);const [username,setUsername]=useState('');const [password,setPassword]=useState('');const [totp,setTotp]=useState('');const [busy,setBusy]=useState(false);
  const refresh=async()=>{try{setUser(await currentUser(await loadServerUrl()))}catch{setUser(null)}};
  useEffect(()=>{void refresh()},[]);
  const signIn=async()=>{if(!username||!password){Alert.alert('请输入用户名和密码');return}setBusy(true);try{setUser(await login(await loadServerUrl(),username,password,totp));setPassword('');Alert.alert('登录成功')}catch{Alert.alert('登录失败','请检查账号、密码或两步验证码。')}finally{setBusy(false)}};
  const signOut=async()=>{await logout();setUser(null)};
  return <View style={s.page}><Text style={s.title}>账户</Text>{user?<View style={s.card}><Text style={s.name}>{user.username||'已登录用户'}</Text><Text style={s.meta}>角色：{user.role||'user'}</Text><Pressable style={s.secondary} onPress={()=>{void signOut()}}><Text style={s.secondaryText}>退出登录</Text></Pressable></View>:<View style={s.card}><Text style={s.label}>用户名</Text><TextInput value={username} onChangeText={setUsername} autoCapitalize="none" style={s.input}/><Text style={s.label}>密码</Text><TextInput value={password} onChangeText={setPassword} secureTextEntry style={s.input}/><Text style={s.label}>两步验证码（可选）</Text><TextInput value={totp} onChangeText={setTotp} keyboardType="number-pad" style={s.input}/><Pressable disabled={busy} style={s.primary} onPress={()=>{void signIn()}}><Text style={s.primaryText}>{busy?'登录中...':'登录'}</Text></Pressable></View>}</View>
}
const s=StyleSheet.create({page:{flex:1,padding:24,backgroundColor:'#f7f9fc'},title:{fontSize:28,fontWeight:'800',color:'#172033'},card:{backgroundColor:'#fff',borderWidth:1,borderColor:'#e5eaf2',borderRadius:8,padding:18,marginTop:22},name:{fontSize:20,fontWeight:'800',color:'#172033'},meta:{fontSize:14,color:'#657187',marginTop:8},label:{fontSize:14,fontWeight:'700',color:'#344054',marginTop:10},input:{height:46,borderWidth:1,borderColor:'#d8dfeb',borderRadius:8,paddingHorizontal:12,marginTop:7,color:'#172033'},primary:{height:48,borderRadius:8,backgroundColor:'#2f7df6',alignItems:'center',justifyContent:'center',marginTop:18},primaryText:{color:'#fff',fontWeight:'700'},secondary:{height:46,borderRadius:8,borderWidth:1,borderColor:'#d8dfeb',alignItems:'center',justifyContent:'center',marginTop:18},secondaryText:{color:'#344054',fontWeight:'700'}});
