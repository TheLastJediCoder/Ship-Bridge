import 'express';

export interface UserContext {
  username: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      userContext?: UserContext;
    }
  }
}
