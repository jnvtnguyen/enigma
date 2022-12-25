import { Repository } from 'typeorm';

import WorkspaceUser from '@/api/models/WorkspaceUser';

export default class WorkspaceUserRepository extends Repository<WorkspaceUser> {}
