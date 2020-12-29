import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { DesktopOutlined, HomeOutlined } from '@ant-design/icons';
interface Props {}

export const MenuComponent = (props: Props) => {
  return (
    <>
      <div className="logo"></div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<HomeOutlined />}>
          Cards
          <Link to="/" />
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          Contact me
          <Link to="/contact" />
        </Menu.Item>
        {/* <Menu.Item key="3" icon={<DesktopOutlined />}>
          Login
          <Link to="/login" />
        </Menu.Item> */}
      </Menu>
    </>
  );
};
