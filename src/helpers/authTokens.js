let accessToken = '';
let refreshToken = '';

export function setTokens(access, refresh) {
  accessToken = access;
  refreshToken = refresh;
  access && localStorage.setItem('accessToken', access);
  refresh && localStorage.setItem('refreshToken', refresh);
}

export function loadTokensFromStorage() {
  accessToken = localStorage.getItem('accessToken') || '';
  refreshToken = localStorage.getItem('refreshToken') || '';
}

export function getAccessToken() {
  return accessToken;
}

export function getRefreshToken() {
  return refreshToken;
}

export function clearTokens() {
  accessToken = '';
  refreshToken = '';
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
}
