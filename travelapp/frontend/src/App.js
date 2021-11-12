import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from 'redux/user/actions/getUser/thunk';
import UnauthenticatedApp from 'routers/UnauthenticatedApp';
import AuthenticatedApp from 'routers/AuthenticatedApp';
import { StyledSpinner } from 'styles/Spinner';

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
