const urls = {
  api: {
    all: (workspaceKey: string) => {
      return `/api/workspaces/${workspaceKey}/groups`;
    }
  }
};

export default urls;
