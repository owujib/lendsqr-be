export interface UserAttributes {
  id?: number;
  email: string;
  fullname?: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface AccessTokenAttributes {
  id?: number;
  revoked: boolean;
  token: string;
  expires_at?: string;
  expires_at_ms: number;
  user_id?: UserAttributes['id'];
}

export interface WalletAttributes {
  id?: number;
  user_id?: UserAttributes['id'];
  balance: number;
}
