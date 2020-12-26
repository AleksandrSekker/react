import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, useHistory } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Layout, PageHeader, Button, notification } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import { MenuComponent } from './components/Menu/Menu';
import { Todolist } from './components/Todolist/Todolist';
import { Registration } from './components/registration/Registration';
import { Login } from './components/login/Login';
import axios from 'axios';
const { Content, Footer, Sider } = Layout;

function App() {
  const [collapsed, setcollapsed] = useState(false);
  const [user, setuser] = useState(String)
  // let history = useHistory();
  const toggle = () => {
    setcollapsed(collapsed !== true ? true : false);
  };
  let history = useHistory();
    
  
  const logout = () => {
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/auth-token/token/logout/',      
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
    }).then(function (response) {
      // handle success
      
      if (response.status >= 200 && response.status < 300) {
        // history.push('/login')
        notification['success']({
          message: 'You sussessfully logout',
        });
      }
    }).catch(function (error) {
      // handle error
      console.log(error);
      notification['error']({
        message: 'You currently not login because you cant logout '
      })
    })
    localStorage.clear()
  }
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          breakpoint="md"
          collapsible
          collapsedWidth="0"
          trigger={null}
          onCollapse={toggle}
          collapsed={collapsed}
        >
          <MenuComponent />
        </Sider>

        <Layout className="site-layout">
          <PageHeader
            title={user}
            extra={[
              <Button key="1" onClick={toggle}>
                <MenuOutlined />
              </Button>,
              
              <Button key="2" onClick={logout}>
              Logout
            </Button>,
            
            ]}
          ></PageHeader>

          <Content style={{ margin: '0 16px' }} >
            <Route exact path="/" component={Todolist}  />
            <Route path="/registration" component={Registration} />
            <Route path="/login" component={Login} />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            ©2020 Created by Aleksandr Sekker
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
