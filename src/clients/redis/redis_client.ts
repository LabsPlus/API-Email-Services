import Redis from 'ioredis';

// URL de conexão fornecida
const redisURL = process.env.REDIS_URL as string;

// Criando uma instância do Redis
const RedisClient = new Redis(redisURL, {
  tls: {}, // Ativando TLS
});

export default RedisClient;
