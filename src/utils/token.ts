export const TOKEN_KEY = "__user_token__";

export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string {
  return localStorage.getItem(TOKEN_KEY) || "";
}

export function hasToken(): boolean {
  return Boolean(getToken());
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}
