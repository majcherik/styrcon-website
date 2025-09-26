interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private store = new Map<string, RateLimitEntry>();
  private windowMs: number;
  private maxRequests: number;

  constructor(windowMs: number = 15 * 60 * 1000, maxRequests: number = 5) {
    this.windowMs = windowMs; // 15 minutes by default
    this.maxRequests = maxRequests; // 5 requests per window
  }

  check(identifier: string): { allowed: boolean; resetTime?: number } {
    const now = Date.now();
    const entry = this.store.get(identifier);

    // Clean up expired entries periodically
    this.cleanup(now);

    if (!entry || now > entry.resetTime) {
      // First request or window has reset
      this.store.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return { allowed: true };
    }

    if (entry.count >= this.maxRequests) {
      return {
        allowed: false,
        resetTime: entry.resetTime
      };
    }

    // Increment count
    entry.count++;
    this.store.set(identifier, entry);
    return { allowed: true };
  }

  private cleanup(now: number) {
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.resetTime) {
        this.store.delete(key);
      }
    }
  }

  reset(identifier: string) {
    this.store.delete(identifier);
  }
}

// Global instance for contact form rate limiting
export const contactFormLimiter = new RateLimiter(15 * 60 * 1000, 3); // 3 requests per 15 minutes

export function getClientIdentifier(request: Request): string {
  // Try to get real IP from various headers (Vercel, Cloudflare, etc.)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');

  const ip = cfConnectingIp || realIp || forwarded?.split(',')[0] || 'unknown';
  return `contact_${ip}`;
}