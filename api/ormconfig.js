module.exports = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: 5432,
  username: '',
  password: '',
  database: 'satamat-kartalla',
  entities: ['src/entity/*.ts'],
  logging: true,
  synchronize: true,
};
