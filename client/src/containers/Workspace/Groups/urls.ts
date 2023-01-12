const urls = {
  api: {
    groups: (workspaceKey: string) => {
      return `/api/workspaces/${workspaceKey}/groups`;
    },
    group: (workspaceKey: string, groupKey: string) => {
      return `/api/workspaces/${workspaceKey}/groups/${groupKey}`;
    },
    members: (workspaceKey: string, groupKey: string) => {
      return `/api/workspaces/${workspaceKey}/groups/${groupKey}/members`;
    }
  }
};

export default urls;
