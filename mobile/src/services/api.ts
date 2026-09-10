import * as SecureStore from 'expo-secure-store';

const SERVER_KEY = 'savextube.serverUrl';
const TOKEN_KEY = 'savextube.authToken';
export const DEFAULT_SERVER_URL = 'https://save.tmac.top:13483';

export async function loadServerUrl() {
  return (await SecureStore.getItemAsync(SERVER_KEY)) ?? DEFAULT_SERVER_URL;
}

export async function saveServerUrl(value: string) {
  const normalized = value.trim().replace(/\/$/, '');
  if (normalized) await SecureStore.setItemAsync(SERVER_KEY, normalized);
  else await SecureStore.deleteItemAsync(SERVER_KEY);
  return normalized;
}

export async function submitDownload(serverUrl: string, url: string) {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);
  const response = await fetch(`${serverUrl.replace(/\/$/, '')}/api/download`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify({ url: url.trim(), chat_id: '', client: 'mobile' }),
  });
  if (!response.ok) throw new Error(`DOWNLOAD_FAILED_${response.status}`);
  return response.json();
}

async function request(serverUrl: string, path: string, init?: RequestInit): Promise<any> {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);
  const response = await fetch(`${serverUrl.replace(/\/$/, '')}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(init?.headers ?? {}) },
  });
  if (!response.ok) throw new Error(`REQUEST_FAILED_${response.status}`);
  return response.json();
}
export const listDownloads = (server: string) => request(server, '/api/downloads');
export const listHistory = (server: string) => request(server, '/api/history?limit=50');
export const listFiles = (server: string) => request(server, '/api/files');
export const listSubscriptions = (server: string) => request(server, '/api/subscriptions');
export const listLiveRooms = (server: string) => request(server, '/api/live/rooms');
export const dashboardStats = (server: string) => request(server, '/api/dashboard-stats');
export const serverVersion = (server: string) => request(server, '/api/version');
export const listLogs = (server: string) => request(server, '/api/logs?lines=500');
export const monitorStats = (server: string) => request(server, '/api/admin/monitor');
export const changePassword = (server:string,currentPassword:string,newPassword:string) => request(server,'/api/auth/change_password',{method:'POST',body:JSON.stringify({current_password:currentPassword,new_password:newPassword})});
export async function fileAccessUrl(server:string,historyId:string,fileIndex:string,download=false){
  const token=await SecureStore.getItemAsync(TOKEN_KEY);const base=server.replace(/\/$/,'');const path=`/api/files/${historyId}/${fileIndex}/${download?'download':'stream'}`;
  return `${base}${path}${token?`?token=${encodeURIComponent(token)}`:''}`;
}
export const controlJob = (server: string, id: string, action: 'pause'|'resume'|'cancel') => request(server, `/api/job/${id}/${action}`, { method: 'POST' });
export const controlSubscription = (server: string, id: string, action: 'run'|'toggle') => request(server, `/api/subscriptions/${id}/${action}`, { method: 'POST' });
export const controlLiveRoom = (server: string, id: string, action: 'start'|'stop'|'toggle'|'check') => request(server, `/api/live/rooms/${id}/${action}`, { method: 'POST' });
export const testConnectivity = (server: string) => request(server, '/api/settings/test-connectivity', { method: 'POST' });
export async function login(server: string, username: string, password: string, totpCode?: string) {
  const result = await request(server, '/api/auth/login', { method: 'POST', body: JSON.stringify({ username, password, ...(totpCode ? { totp_code: totpCode } : {}) }) });
  if (!result?.token) throw new Error('LOGIN_TOKEN_MISSING');
  await SecureStore.setItemAsync(TOKEN_KEY, result.token);
  return result.user;
}
export const currentUser = (server: string) => request(server, '/api/auth/me');
export async function logout() { await SecureStore.deleteItemAsync(TOKEN_KEY); }
