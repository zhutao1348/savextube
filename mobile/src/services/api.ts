import * as SecureStore from 'expo-secure-store';

const SERVER_KEY = 'savextube.serverUrl';
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
  const response = await fetch(`${serverUrl.replace(/\/$/, '')}/api/download`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: url.trim(), chat_id: '', client: 'mobile' }),
  });
  if (!response.ok) throw new Error(`DOWNLOAD_FAILED_${response.status}`);
  return response.json();
}
