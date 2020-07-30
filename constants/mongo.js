const mongoHost = '192.168.0.4';
const mongoPort = '27017';
const mongoDbName = 'test';

module.exports = {
  getMongoUri: () => {
    const username = encodeURIComponent(process.env.MONGO_USER);
    const password = encodeURIComponent(process.env.MONGO_PASS);
    return `mongodb://${username}:${password}@${mongoHost}:${mongoPort}/${mongoDbName}?authSource=admin`;
  },
  DUPLICATE_KEY_ERROR_CODE: 11000,
};
