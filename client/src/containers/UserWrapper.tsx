import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LoadingPage from '@/components/LoadingPage';
import { getIsAuthenticated, getAccessToken, getCurrentUser } from '@/selectors/auth';
import urls from '@/util/urls';
import { authorizationHeaders } from '@/util/headers';
import { User } from '@/types';
import { logout, setUser } from '@/slices/auth';

interface Props {
  children: React.ReactElement;
}

const UserWrapper: React.FC<Props> = ({ children }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const accessToken = useSelector(getAccessToken);

  const dispatch = useDispatch();

  const _setUser = (user: User) => dispatch(setUser(user));
  const _logout = () => dispatch(logout());

  const user = useSelector(getCurrentUser);

  useEffect(() => {
    const fetchSetUser = async () => {
      const response = await fetch(urls.api.user.index, {
        method: 'GET',
        headers: {
          ...authorizationHeaders(accessToken)
        }
      });

      if (!response.ok && response.status == 401) {
        _logout();
        return;
      }

      const data = await response.json();
      _setUser(data.user);
    };
    if (isAuthenticated) {
      fetchSetUser();
    }
  }, [isAuthenticated]);

  if (!user) {
    return <LoadingPage />;
  }

  return children;
};

export default UserWrapper;
