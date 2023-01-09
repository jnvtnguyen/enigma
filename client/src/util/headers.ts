export const authorizationHeaders = () => {
  const localUserInformation = JSON.parse(localStorage.getItem('user'));
  const { accessToken } = localUserInformation;

  return {
    Authorization: `Bearer ${accessToken}`
  };
};
