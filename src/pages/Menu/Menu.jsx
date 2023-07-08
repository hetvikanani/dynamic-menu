import React, { useState } from 'react';
import { Button, Menu, Modal, Form, Input, Select, Switch } from 'antd';

import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateMenu } from '../../redux/menu/menuSlice';
import RandomIcon from '../../Components/RandomIcon';

const { Option } = Select;

const MenuPage = () => {
  const items = useSelector((state) => state.menu.allMenus);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();

  const handleAddMenuItem = () => {
    form.validateFields().then((values) => {
      dispatch(updateMenu(values));
      setIsOpen(false);
      form.resetFields();
    });
  };

  const handleClick = (e) => {
    console.log('click', e);
  };

  const renderParentMenuOptions = (items, indent = 0) => {
    return items.map((item) => {
      const subMenuOptions = item.children
        ? renderParentMenuOptions(item.children, indent + 1)
        : null;
      return (
        <React.Fragment key={item.key}>
          <Option value={item.key}>{`${'\u00A0'.repeat(indent * 2)}- ${item.label}`}</Option>
          {subMenuOptions}
        </React.Fragment>
      );
    });
  };

  const [darkMode, setDarkMode] = useState(false);

  const handleThemeChange = (checked) => {
    setDarkMode(checked);
  };
  const themeClass = darkMode ? 'dark-theme' : 'light-theme';
  const menuClass = darkMode ? 'dark-menu' : 'light-menu';
  return (
    <div className={`${themeClass} h-screen w-screen flex justify-center items-center`}>
      <div>
        <div className='theme-switcher flex justify-center items-center'>
          <span className='theme-switcher-label'>Dark Mode</span>
          <Switch checked={darkMode} onChange={handleThemeChange} />
        </div>
        <div className='m-8 flex justify-center items-center'>
          <Button className={themeClass} onClick={() => setIsOpen(true)}>
            Add Menu Item
          </Button>
        </div>
        <Menu
          style={{ width: 300 }}
          onClick={handleClick}
          mode='vertical'
          items={items.map((item) => ({ ...item, icon: RandomIcon() }))}
          className={menuClass}
        />
        <Modal visible={isOpen} onCancel={() => setIsOpen(false)} footer={null}>
          <Form form={form} onFinish={handleAddMenuItem} className='m-8'>
            <Form.Item
              name='label'
              label='Menu Label'
              rules={[{ required: true, message: 'Please enter a label' }]}
            >
              <Input placeholder='Enter menu label' />
            </Form.Item>
            <Form.Item name='parentKey' label='Parent Menu'>
              <Select placeholder='Select Parent Menu'>
                <Option value=''>Main Menu</Option>
                {renderParentMenuOptions(items)}
              </Select>
            </Form.Item>
            <Button type='primary' htmlType='submit'>
              Add
            </Button>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default MenuPage;
