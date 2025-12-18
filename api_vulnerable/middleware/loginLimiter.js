import { handleError } from "../helpers/handleError.js";

const ipRequestMap = new Map();

const WINDOW_MS = 10 * 60 * 1000; 
const MAX_ATTEMPTS = 5;          

setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of ipRequestMap.entries()) {
    if (now - data.startTime > WINDOW_MS) {
      ipRequestMap.delete(ip);
    }
  }
}, WINDOW_MS);

export const resetLimiter = (ip) => {
    if (ipRequestMap.has(ip)) {
        ipRequestMap.delete(ip);
    }
};

export const loginLimiter = (req, res, next) => {
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip;
  if (ip && ip.toString().includes('::ffff:')) {
    ip = ip.toString().replace('::ffff:', '');
  }

  const now = Date.now();

  if (!ipRequestMap.has(ip)) {
    ipRequestMap.set(ip, { count: 1, startTime: now });
    return next();
  }

  const data = ipRequestMap.get(ip);

  if (now - data.startTime > WINDOW_MS) {
    data.count = 1;
    data.startTime = now;
    ipRequestMap.set(ip, data);
    return next();
  }

  data.count += 1;

  if (data.count > MAX_ATTEMPTS) {
    const timeLeft = Math.ceil((WINDOW_MS - (now - data.startTime)) / 1000);
    
    console.log(`\x1b[33m[RATE LIMIT BANNED] IP: ${ip} blocked! Reason: Too many attempts (${data.count}/${MAX_ATTEMPTS}). Retry in ${timeLeft}s.\x1b[0m`);
    
    return next(handleError(429, `Too many login attempts. Please try again in ${timeLeft} seconds.`));
  }

  next();
};