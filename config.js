var config = {}

config.redis = {}
config.postgre = {}
config.web = {}
config.stormpath = {}
config.facebook = {}
config.google = {}

config.logging = process.env.NODE_LOGGING || 1;
config.logging_level = process.env.LOGGING_LEVEL || 'debug';
config.redis.host = process.env.REDISCLOUD_URL || 'localhost';

config.postgre.connection = process.env.HEROKU_POSTGRESQL_VIOLET_URL || 'localhost';

config.web.port = process.env.PORT || 3000;

config.stormpath.key_id = process.env.STORMPATH_API_KEY_ID || '';
config.stormpath.key_secret = process.env.STORMPATH_API_KEY_SECRET || '';
config.stormpath.url = process.env.STORMPATH_URL || '';
config.stormpath.application = process.env.STORMPATH_APPLICATION_ID || '';
config.stormpath.session_secret = process.env.STORMPATH_SESSION_SECRET || '';

config.facebook.appId = process.env.FACEBOOK_APP_ID || '';
config.facebook.secret = process.env.FACEBOOK_APP_SECRET || '';

config.google.clientId = process.env.GOOGLE_CLIENT_ID || '';
config.google.clientSecret = process.env.GOOGLE_CLIENT_SECRET || '';

module.exports = config;