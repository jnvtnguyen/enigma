const urls = {
  api: {
    groups: (workspaceKey: string) => {
      return `/api/workspaces/${workspaceKey}/groups`;
    },
    group: (workspaceKey: string, groupName: string) => {
      return `/api/workspaces/${workspaceKey}/groups/${groupName}`;
    },
    members: (workspaceKey: string, groupName: string) => {
      return `/api/workspaces/${workspaceKey}/groups/${groupName}/members`;
    }
  }
};

export default urls;
