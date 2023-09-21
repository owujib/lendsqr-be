import { string } from 'joi';

namespace Nodejs {
  interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
    APP_KEY: string;

    UPLOADS_DIR: string;

    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;

    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_HOST: string;
    DIALECT: string;

    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_DEFAULT_REGION: string;
    AWS_BUCKET: string;
    AWS_URL: string;
    AWS_ENDPOINT: string;
    AWS_USE_PATH_STYLE_ENDPOINT: string;

    EMAIL_HOST: string;
    EMAIL_PORT: string;
    EMAIL_USERNAME: string;
    EMAIL_PASSWORD: string;

    DATABASE_HOSTNAME: string;
    DATABASE_NAME: string;
    DATABASE_USER: string;
    DATABASE_PASSWORD: string;
    DATABASE_PORT: string;

    TEST_DATABASE_HOSTNAME: string;
    TEST_DATABASE_NAME: string;
    TEST_DATABASE_USER: string;
    TEST_DATABASE_PASSWORD: string;
    TEST_DATABASE_PORT: string;
  }
}
