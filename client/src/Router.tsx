import React, { ReactNode, useLayoutEffect, useState } from 'react';
import { Router as BaseRouter } from 'react-router-dom';
import { BrowserHistory } from 'history';

type Props = {
  history: BrowserHistory;
  children: ReactNode;
};

const Router: React.FC<Props> = ({ history, children, ...props }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <BaseRouter
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </BaseRouter>
  );
};

export default Router;
