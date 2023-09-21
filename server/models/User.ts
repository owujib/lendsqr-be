import db from '../database';
import { UserAttributes } from '../interface/models';

class User {
  tableName: string;
  constructor() {
    this.tableName = 'users';
  }

  async create(userData: UserAttributes) {
    return db<UserAttributes>(this.tableName).insert(userData);
  }

  async findById(id: number) {
    return db<UserAttributes>(this.tableName).where({ id }).first();
  }

  async findByEmail(email: string) {
    return db<UserAttributes>(this.tableName).where({ email }).first();
  }

  async update(id: number, newData: any) {
    return db<UserAttributes>(this.tableName).where({ id }).update(newData);
  }

  async delete(id: number) {
    return db<UserAttributes>(this.tableName).where({ id }).del();
  }
}

export default User;
