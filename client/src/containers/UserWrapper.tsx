import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LoadingPage from '@/components/LoadingPage';
import { getIsAuthenticated, getAccessToken } from '@/selectors/auth';
import urls from '@/util/urls';
import { authorizationHeaders } from '@/util/headers';
import { User } from '@/types';
import { setUser } from '@/slices/auth';

interface Props {
  children: React.ReactElement;
}

const UserWrapper: React.FC<Props> = ({ children }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const accessToken = useSelector(getAccessToken);

  const dispatch = useDispatch();

  const _setUser = (user: User) => dispatch(setUser(user));

  const [isUserLoaded, setIsUserLoaded] = useState<boolean>(isAuthenticated ? false : true);

  useEffect(() => {
    const fetchSetUser = async () => {
      const response = await fetch(urls.api.user.index, {
        method: 'GET',
        headers: {
          ...authorizationHeaders(accessToken)
        }
      });

      const data = await response.json();
      _setUser(data.user);
      setIsUserLoaded(true);
    };
    if (isAuthenticated) {
      fetchSetUser();
    }
  }, [isAuthenticated]);

  if (!isUserLoaded) {
    return <LoadingPage />;
  }

  return children;
};

export default UserWrapper;
