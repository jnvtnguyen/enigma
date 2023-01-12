import { ProjectPermission } from '@/api/models/ProjectUser';

export default class CreateGroupRequest {
  public name: string;
  public description?: string;
  public defaultPermission: ProjectPermission;
}
