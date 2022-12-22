export const authorizationHeaders = (accessToken: string) => {
  return {
    Authorization: `Bearer ${accessToken}`
  };
};
