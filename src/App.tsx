import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Layout, PageHeader, Button, notification } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import { MenuComponent } from './components/Menu/Menu';
import { Todolist } from './components/Todolist/Todolist';
import { Registration } from './components/registration/Registration';
import { Login } from './components/login/Login';
import axios from 'axios';
import { ContactForm } from './components/contactform/ContactForm';
const { Content, Footer, Sider } = Layout;

function App() {
  const [collapsed, setcollapsed] = useState(false);

  const toggle = () => {
    setcollapsed(collapsed !== true ? true : false);
  };
    
  
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
      
      console.log(response.status)
      if (response.status >= 200 && response.status < 300) {
        
        notification['success']({
          message: 'You sussessfully logout',
        });
        return <Redirect to='/login' />
      }
    }).catch(function (error) {
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
            title=''
            extra={[
              <Button key="1" onClick={toggle}>
                <MenuOutlined />
              </Button>,
              <Link to="/login">
              <Button key="2" onClick={logout}>
              Logout
              </Button>
              </Link>
            
            ]}
          ></PageHeader>

          <Content style={{ margin: '0 16px' }} >
            <Route exact path="/" component={Todolist}  />
            <Route path="/registration" component={Registration} />
            <Route path="/login" component={Login} />
            <Route path="/contact" component={ContactForm} />
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
