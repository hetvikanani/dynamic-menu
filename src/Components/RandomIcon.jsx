import { MailOutlined, SettingOutlined, AppstoreOutlined } from '@ant-design/icons';

function RandomIcon() {
  const icons = [
    <MailOutlined key='mail' />,
    <SettingOutlined key='settings' />,
    <AppstoreOutlined key='app' />,
  ];
  const randomIndex = Math.floor(Math.random() * icons.length);
  const randomIcon = icons[randomIndex];

  return <div>{randomIcon}</div>;
}
export default RandomIcon;
