export default class RateLimit {

    private static readonly RATE_LIMIT = 3;
    private static readonly RATE_LIMIT_TIME = 60 * 1000;
    private static readonly RATE_LIMIT_MAP = new Map();
    
    public static isRateLimited(ip: string): boolean {
        const currentTime = new Date().getTime();
        if (this.RATE_LIMIT_MAP.has(ip)) {
            const lastRequestTime = this.RATE_LIMIT_MAP.get(ip);
            if (currentTime - lastRequestTime < this.RATE_LIMIT_TIME) {
                return true;
            }
        }
        this.RATE_LIMIT_MAP.set(ip, currentTime);
        setTimeout(() => {
            this.RATE_LIMIT_MAP.delete(ip);
        }, this.RATE_LIMIT_TIME);
        return false;
    }

    public static blockIP(ip: string): void {
        this.RATE_LIMIT_MAP.set(ip, 0);
    }

    public static getRateLimit(): number {
        return this.RATE_LIMIT;
    }

    public static getRateLimitTime(): number {
        return this.RATE_LIMIT_TIME;
    }

    public static getRateLimitMap(): Map<string, number> {
        return this.RATE_LIMIT_MAP;
    }

    public static clearRateLimitMap(): void {
        this.RATE_LIMIT_MAP.clear();
    }

    public static getRateLimitRemaining(ip: string): number {
        const currentTime = new Date().getTime();
        if (this.RATE_LIMIT_MAP.has(ip)) {
            const lastRequestTime = this.RATE_LIMIT_MAP.get(ip);
            if (currentTime - lastRequestTime < this.RATE_LIMIT_TIME) {
                return this.RATE_LIMIT - 1;
            }
        }
        return this.RATE_LIMIT;
    }

    public static getRateLimitResetTime(ip: string): number {
        if (this.RATE_LIMIT_MAP.has(ip)) {
            const lastRequestTime = this.RATE_LIMIT_MAP.get(ip);
            return this.RATE_LIMIT_TIME - (new Date().getTime() - lastRequestTime);
        }
        return this.RATE_LIMIT_TIME;
    }

    public static clearInvalidAttempts(ip: string): void {
        this.RATE_LIMIT_MAP.delete(ip);
    }
    
    public static addInvalidAttempt(ip: string): void {
        if (this.RATE_LIMIT_MAP.has(ip)) {
            this.RATE_LIMIT_MAP.set(ip, this.RATE_LIMIT_MAP.get(ip) + 1);
        } else {
            this.RATE_LIMIT_MAP.set(ip, 1);
        }
    }

}