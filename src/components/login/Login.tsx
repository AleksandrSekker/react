import React, {useState, useEffect} from 'react'
import { Form, Input, Button,notification, Row } from 'antd';
import axios from 'axios';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
interface Props {

}
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  
export const Login = (props: Props) => {
  const [username, setusername] = useState(String)
  const [password, setpassword] = useState(String)
  const [user, setuser] = useState(String)
  const isAuth = !!localStorage.getItem("token");
  const history = useHistory()
  interface MyState {
    values: String,
  }
    const onFinish = (values: MyState) => {
        axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/auth-token/token/login/',
          data: {
            username: username,
            password: password
          },
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })
          .then(function (response: any) {
            localStorage.setItem('token', response.data.auth_token)
            console.log(response.data.auth_token)
            console.log(response.status);
            if (response.status >= 200 && response.status < 300) {
              
              notification['success']({
                message: 'You sussessfully login',
              });
              history.push('/')
            }
          })
          .catch(function (error:string) {
            notification['error']({
              message: 'You type wrong username or password'
            })
          });
          axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/user/user/by/token/',      
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Token ${localStorage.getItem('token')}`
      
            },
          }).then(function (response) {

            setuser(response.data.username)
          })
         .catch(function (error) {

            console.log(error);
          })
      };
      useEffect(() => {
        console.log('update')

      }, [isAuth])
      const onFinishFailed = (errorInfo:any) => {
        notification['error']({
          message: 'You type wrong on of field'
        })
      };
    return (<div>{isAuth ? <Redirect to='/' /> : (<Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input value={username} onChange={(e) => {setusername(e.target.value)}} />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password value={password} onChange={(e) => {setpassword(e.target.value)}} />
      </Form.Item>
      <Form.Item {...tailLayout} >
        <Row>
          <p style={{marginRight: '.5rem'}}>If don't have account, you can</p>
          <NavLink to='/registration'>register</NavLink>
        </Row>
      </Form.Item>
      
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>)}</div>
    )
}
