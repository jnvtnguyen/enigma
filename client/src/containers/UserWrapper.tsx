import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LoadingPage from '@/components/LoadingPage';
import { getIsAuthenticated, getCurrentUser } from '@/selectors/auth';
import urls from '@/util/urls';
import { User } from '@/types';
import { logout, setUser } from '@/slices/auth';
import { httpRequest } from '@/util/http-request';

interface Props {
  children: React.ReactElement;
}

const UserWrapper: React.FC<Props> = ({ children }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  const dispatch = useDispatch();

  const _setUser = (user: User) => dispatch(setUser(user));
  const _logout = () => dispatch(logout());

  const user = useSelector(getCurrentUser);

  useEffect(() => {
    const fetchSetUser = async () => {
      try {
        const response = await httpRequest<any>().get(urls.api.user.index);

        _setUser(response.user);
      } catch (error) {
        _logout();
      }
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
