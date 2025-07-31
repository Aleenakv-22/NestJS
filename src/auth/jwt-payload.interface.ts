export interface JwtPayload {
  username: string;
  id: string;
  iat?: number; // Optional, for issued at timestamp
  exp?: number; // Optional, for expiration timestamp
}
