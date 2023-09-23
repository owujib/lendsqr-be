> this template was forked from [my respository](https://github.com/owujib/express-squelize-boilerplate)


---

# Demo Credit Wallet Service

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Database Design](#database-design)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Testing](#testing)
- [Deployment](#deployment)
- [Postman Collection](#postman-collection)



## Features

- User Account Creation
- Wallet Funding
- Fund Transfer
- Withdrawal
- Authentication
- Comprehensive Testing
- Deployed on Render

## Tech Stack

- Node.js (LTS version)
- TypeScript
- Knex.js ORM
- MySQL Database
- Jest (for testing)
- Express.js (for routing)

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/owujib/lendsqr-be
   ```

2. Navigate to the project directory:

   ```bash
   cd lendsqr-be
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the project root and configure the following environment variables:

   ```env
    NODE_ENV=production

    UPLOADS_DIR=uploads
    JWT_EXPIRES_IN=7d
    APP_KEY=373c37c73fef82d00480389a9147f7f074aa500aadcb3dad19

    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=


    AWS_ACCESS_KEY_ID=''
    AWS_SECRET_ACCESS_KEY=''
    AWS_DEFAULT_REGION=''
    AWS_BUCKET=''
    AWS_URL=''
    AWS_ENDPOINT=''
    AWS_USE_PATH_STYLE_ENDPOINT=''

    DATABASE_HOSTNAME=''
    DATABASE_NAME=''
    DATABASE_USER=''
    DATABASE_PASSWORD=''
    DATABASE_PORT=''

    TEST_DATABASE_HOSTNAME=localhost
    TEST_DATABASE_NAME=lendsqr_test
    TEST_DATABASE_USER=root
    TEST_DATABASE_PASSWORD=
    TEST_DATABASE_PORT=3306
   ```

   Replace `test database configuration`, with your actual database configurations.

## Database Design

The application uses a MySQL database with the following tables:

1. **users** - Stores user account information.

   ```sql
    CREATE TABLE `users` (
    `id` int(10) UNSIGNED NOT NULL,
    `email` varchar(255) NOT NULL,
    `fullname` varchar(255) DEFAULT NULL,
    `password` varchar(255) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
    `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
    );
   ```

2. **user_wallets** - Stores user wallet information.

   ```sql
    CREATE TABLE `user_wallets` (
    `id` int(10) UNSIGNED NOT NULL,
    `user_id` int(10) UNSIGNED DEFAULT NULL,
    `balance` int(11) NOT NULL DEFAULT 0,
    `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
    `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
    );

   ```
2. **transactions** - Stores transaction history.

   ```sql
        CREATE TABLE `access_tokens` (
    `id` int(10) UNSIGNED NOT NULL,
    `revoked` tinyint(1) DEFAULT 0,
    `token` varchar(255) NOT NULL,
    `expires_at` varchar(255) DEFAULT NULL,
    `expires_at_ms` bigint(20) DEFAULT NULL,
    `user_id` int(10) UNSIGNED DEFAULT NULL,
    `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
    `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
    );
   ```

## API Endpoints

- `POST /api/auth/register` - Register a new user account.
- `POST /api/auth/login` - Log in and obtain a JWT token.
- `POST /api/wallet/top-up` - Fund the user's wallet (requires JWT token).
- `POST /api/wallet/transfer` - Transfer funds to another user (requires JWT token).
- `POST /api/wallet/withdraw` - Withdraw funds from the user's wallet (requires JWT token).

## Authentication

Authentication in this project Json webtokens is being used for authentication

## Testing

The application is thoroughly tested using the Jest testing framework. Both positive and negative test scenarios are covered to ensure code reliability.

To run tests, use the following command:

```bash
npm test
```

## Deployment

The API is deployed on Heroku and can be accessed at [https://favour-lendsqr-be-test.onrender.com](https://favour-lendsqr-be-test.onrender.com).

## Postman Collection

You can find the Postman collection for testing the API at the following URL:

[Postman Collection](https://www.postman.com/owujib/workspace/b78f99b9-d339-4111-bc01-9c410c9b3008/share?collection=27213384-a9c1b3f5-085e-4ef4-ae02-9589ecd9a819&target=embed&selectedEnvironment=27213384-1004accb-7085-4041-931e-b3a15b7a2678)


---

