export const EnvConfiguration = () => ({
  database: {
    port: process.env.DB_HOST,
    username: process.env.DB_PORT,
    password: process.env.DB_USER,
    database: process.env.DB_PASS,
  },
  api: {
    port: process.env.SERVICE_PORT,
    jwt: process.env.JWT_SECRET,
    jwt_expired: process.env.JWT_EXPIRED,
    open_api: process.env.OPENAI_API_KEY,
  },
});
