import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { notification, Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { logoutUser } from '../redux/user/actions/logoutUser/thunk';
import { useErrorNotification } from '../utils';

const { Header } = Layout;
const { SubMenu } = Menu;

const StyledNav = styled(Menu)`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
`;

function Navigation() {
  const dispatch = useDispatch();
  const { data, token, error } = useSelector((state) => state.user);

  useErrorNotification(error, 'Nieudane wylogowanie');

  async function handleLogout() {
    const resp = await dispatch(logoutUser(token));

    if (resp.error === undefined) {
      notification.success({
        message: 'Poprawnie wylogowano',
        description: 'Do zobaczenia!',
      });
    }
  }

  return (
    <Header>
      <StyledNav theme="dark" mode="horizontal">
        <Menu.Item key="allPlans">
          <Link to="/">Dostępne podróże</Link>
        </Menu.Item>
        <Menu.Item key="createPlan">
          <Link to="/travel/plan">Zaplanuj podróż</Link>
        </Menu.Item>
        <Menu.Item key="createdPlans" style={{ marginRight: 'auto' }}>
          Moje podróże
        </Menu.Item>
        <SubMenu
          key="user"
          icon={<UserOutlined />}
          title={data.username}
          popupOffset={[0, 0]}
          onClick={handleLogout}
        >
          <Menu.Item key="logout">Wyloguj się</Menu.Item>
        </SubMenu>
      </StyledNav>
    </Header>
  );
}

export default Navigation;
