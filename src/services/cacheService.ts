import RedisClient from "../clients/redis/redis_client";

export default class CacheService {

    private redisClient: any;

    constructor() {
        this.redisClient = RedisClient;
    }

    public async setCache(key: string, value: string): Promise<boolean> {
        
        try {

            if (typeof value !== 'string') {
                throw new Error('Cache value must be a string.');
            }

            if (await this.redisClient.exists(key)) {
                throw new Error('Cache already exists.');
            }

            const cacheValue = JSON.stringify(value);
            const cacheKey = JSON.stringify(key);

            await this.redisClient.set(cacheKey, cacheValue);
            await this.redisClient.expire(cacheKey, 7200);
            
            return true;
        } catch (error: any) {
            throw new Error(error.message || 'Error setting cache.');
        }
    }

    public async getCache(key: string): Promise<string> {
        
        try {

            const result = await this.redisClient.get(key);

            if (!result) {
                throw new Error('Cache not found.');
            }

            const cache = JSON.parse(result);
            return cache;

        } catch (error: any) {
            throw new Error(error.message || 'Error getting cache.');
        }
    }

    public async deleteCache(key: string): Promise<boolean> {
        
        try {
            await this.redisClient.del(key);
            return true;
        } catch (error: any) {
            throw new Error(error.message || 'Error deleting cache.');
        }
    }

    public async checkCacheStatus(key: string): Promise<boolean> {
        
        try {
            const cacheStatus = await this.redisClient.exists(key);
            return cacheStatus === 1 ? true : false;
        } catch (error: any) {
            throw new Error(error.message || 'Error checking cache status.');
        }
    }
}