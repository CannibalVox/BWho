var config = {}

config.redis = {}
config.postgre = {}
config.web = {}

config.logging = process.env.NODE_LOGGING || 1;
config.logging_level = process.env.LOGGING_LEVEL || 'debug';
config.redis.host = process.env.REDISCLOUD_URL || 'localhost:6379';

config.postgre.url = process.env.DATABASE_URL || 'localhost';

config.web.port = process.env.PORT || 3000;

module.exports = config;