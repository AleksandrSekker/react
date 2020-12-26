import React, {useState} from 'react'
import { Form, Input, Button, Checkbox, notification, Row } from 'antd';
import axios from 'axios';
import { NavLink, useHistory } from 'react-router-dom';
interface Props {
    
}
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  
export const Registration = (props: Props) => {
  const [email, setemail] = useState(String)
  const [username, setusername] = useState(String)
  const [password, setpassword] = useState(String)
  const history = useHistory()
    const onFinish = (values:any) => {
        console.log('Success:', values);
        axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/auth/users/',
          data: {
            email: email,
            username: username,
            password: password
          },
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })
          .then(function (response:any) {
            console.log(response.status);
            if (response.status >= 200 && response.status < 300) {
              history.push('/')
              notification['success']({
                message: 'You sussessfully registred',
              });
            }
          })
          .catch(function (error:any) {
            notification['error']({
              message: 'You type wrong on of field'
            })
          });
          
      };
    
      const onFinishFailed = (errorInfo:any) => {
        notification['error']({
          message: 'You type wrong on of field'
        })
      };
    return (
        <Form
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
        label="Email address"
        name="Email address"
        rules={[{ required: true, message: 'Please input your Email address' }]}
      >
        <Input value={email} onChange={(e) => {setemail(e.target.value)}} />
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
          <p style={{marginRight: '.5rem'}}>If already have account, you can</p>
          <NavLink to='/login'>login</NavLink>
        </Row>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    )
}
