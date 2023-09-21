import request from 'supertest';

import db from '../server/database';
import app from '../server/kernel';

// const User = require('../src/models/user');
// const Transaction = require('../src/models/transaction');

process.env.NODE_ENV = 'test';

describe('Wallet Actions Tests', () => {
  beforeAll(async () => {
    await db.migrate.latest();
    await db.seed.run();
  });

  afterAll(async () => {
    await db.destroy();
  });

  describe('Transfer Funds', () => {
    it('should transfer funds between two users with valid authentication', async () => {
      const senderCredentials = {
        email: 'user1@email.com',
        password: 'password001',
      };

      const senderLoginResponse = await request(app)
        .post('/api/auth/login')
        .send(senderCredentials)
        .expect(200);

      const senderToken = senderLoginResponse.body.data.access_token;

      const transferData = {
        recipient_id: 2,
        amount: 500,
      };

      const transferResponse = await request(app)
        .post('/api/wallet/transfer')
        .set('Authorization', `Bearer ${senderToken}`)
        .send(transferData)
        .expect(200);

      expect(transferResponse.body).toHaveProperty(
        'message',
        'Wallet transfer successful',
      );
    });

    it('should fail to transfer funds with invalid authentication', async () => {
      const transferData = {
        sender_id: 1,
        recipient_id: 2,
        amount: 50,
      };

      await request(app)
        .post('/api/wallet/transfer')
        .send(transferData)
        .expect(401);
    });
  });

  describe('Withdraw Funds', () => {
    it('should withdraw funds with valid authentication', async () => {
      const userCredentials = {
        email: 'user1@email.com',
        password: 'password001',
      };

      // Log in to obtain a token
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send(userCredentials)
        .expect(200);

      const userToken = loginResponse.body.data.access_token;

      const withdrawalData = {
        amount: 30,
      };

      const withdrawalResponse = await request(app)
        .post('/api/wallet/withdraw')
        .set('Authorization', `Bearer ${userToken}`)
        .send(withdrawalData)
        .expect(200);

      expect(withdrawalResponse.body).toHaveProperty(
        'message',
        'Withdrawal successful',
      );
    });

    it('should fail to withdraw funds with invalid authentication', async () => {
      const withdrawalData = {
        amount: 30,
      };

      await request(app)
        .post('/api/wallet/withdraw')
        .send(withdrawalData)
        .expect(401);
    });
    it('should top up authenticated user wallet', async () => {
      const userCredentials = {
        email: 'user1@email.com',
        password: 'password001',
      };

      // Log in to obtain a token
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send(userCredentials)
        .expect(200);

      const userToken = loginResponse.body.data.access_token;

      const topupData = {
        amount: 10_000,
      };

      const topupResponse = await request(app)
        .post('/api/wallet/top-up')
        .set('Authorization', `Bearer ${userToken}`)
        .send(topupData)
        .expect(200);

      expect(topupResponse.body).toHaveProperty(
        'message',
        'Wallet top up successful',
      );
      expect(topupResponse.body).toHaveProperty('status', 'success');
    });
  });
});
