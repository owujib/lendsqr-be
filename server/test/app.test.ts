import request from 'supertest';

import db from '../database';
import app from '../kernel';
import User from '../models/User';

describe('Should Authenticate users', () => {
  beforeAll(async () => {
    app.set('NODE_ENV', 'test');

    await db.migrate.rollback();
    // await db.schema.dropTable('knex_migrations_lock');
    await db.migrate.latest();
    await db.seed.run();
  });

  afterAll(async () => {
    /**destroy db */
    await db.migrate.rollback();
    // await db.schema.dropTable('knex_migrations_lock');
    await db.destroy();

    // await db.destroy();
  });

  describe('Create account', () => {
    it('should successfully create an account for a user', async () => {
      let response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'testuser@email.com',
          password: 'password002',
          fullname: 'Test SUper Boy',
        })
        .expect(200);

      expect(response.body).toHaveProperty('status', 'success');
      expect(response.body).toHaveProperty(
        'message',
        'Account has been created',
      );
    });

    it('Should fail request validation', async () => {
      let response = await request(app)
        .post('/api/auth/register')
        .send()
        .expect(400);

      expect(response.body).toHaveProperty('status', 'fail');
      expect(response.body).toHaveProperty(
        'message',
        'Request Validation Error',
      );
    });

    it('Should fail if user exists', async () => {
      let response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'testuser@email.com',
          password: 'password002',
          fullname: 'Test SUper Boy',
        })
        .expect(400);

      expect(response.body).toHaveProperty('status', 'fail');
      expect(response.body).toHaveProperty(
        'message',
        'User details already exist',
      );
    });
  });

  describe('POST/ User Login', () => {
    it('should successfully log a user in', async () => {
      let response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'testuser@email.com',
          password: 'password002',
        })
        .expect(200);

      expect(response.body).toHaveProperty('status', 'success');
      expect(response.body).toHaveProperty('message', 'Login successfull');
    });

    it('should fail request validation', async () => {
      let response = await request(app)
        .post('/api/auth/login')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('status', 'fail');
      expect(response.body).toHaveProperty(
        'message',
        'Request Validation Error',
      );
    });

    it('should fail if user does not exist', async () => {
      let response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'youngman@email.com',
          password: 'password003',
        })
        .expect(400);

      expect(response.body).toHaveProperty('status', 'fail');
      expect(response.body).toHaveProperty('message', 'User does not exist');
    });
  });
});
