import User from '@/api/models/User';

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
