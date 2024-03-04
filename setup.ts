import RedisClient from './src/clients/redis/redis_client';

const redisClient = RedisClient;

module.exports = async () => {
  // Realizar qualquer limpeza necessária após a execução dos testes
  await redisClient.quit();
};
