const DEFAULT_MAX_POSTS = 30;
const DEFAULT_WINDOW_MINUTES = 10;

const signupPosts = new Map<string, number[]>();

function positiveInt(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) return fallback;
  return Math.floor(parsed);
}

function signupMaxPosts() {
  return positiveInt(process.env.SIGNUP_POST_LIMIT, DEFAULT_MAX_POSTS);
}

function signupWindowMs() {
  return positiveInt(process.env.SIGNUP_POST_WINDOW_MINUTES, DEFAULT_WINDOW_MINUTES) * 60 * 1000;
}

export function allowSignupPost(ip: string, now = Date.now()) {
  const key = ip.trim() || 'anonymous';
  const recent = (signupPosts.get(key) ?? []).filter((timestamp) => now - timestamp < signupWindowMs());
  if (recent.length >= signupMaxPosts()) {
    signupPosts.set(key, recent);
    return false;
  }
  recent.push(now);
  signupPosts.set(key, recent);
  return true;
}
