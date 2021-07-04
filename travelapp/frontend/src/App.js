import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Spin } from 'antd';
import { getUser } from './redux/user/actions/getUser/thunk';
import UnauthenticatedApp from './routers/UnauthenticatedApp';
import AuthenticatedApp from './routers/AuthenticatedApp';

const StyledSpinner = styled(Spin)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      dispatch(getUser(token));
    }
  }, [dispatch]);

  if (isLoading) return <StyledSpinner size="large" />;
  if (!isAuthenticated) return <UnauthenticatedApp />;

  return <AuthenticatedApp />;
}

export default App;
