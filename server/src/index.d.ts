import User from '@/api/models/User';
import Workspace from '@/api/models/Workspace';

declare global {
  namespace Express {
    interface Request {
      user: User;
      workspace: Workspace;
    }
  }
}
