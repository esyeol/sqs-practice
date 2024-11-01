import 'dotenv/config';

export const ENV_CONFIG = {
  SQS: {
    REGION: process.env.REGION,
    AC_KEY: process.env.AC_KEY,
    SC_KEY: process.env.SC_KEY,
    QUEUE_NAME: process.env.SQS_NAME,
    PATH: process.env.SQS_URL,
  }
}