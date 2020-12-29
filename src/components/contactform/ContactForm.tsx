import React, {useState} from 'react'
import { Form, Input, Button,  } from 'antd';
import axios from 'axios';
import { notification } from 'antd';
import { Redirect } from 'react-router-dom';
interface Props {
    
}
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  
export const ContactForm = (props: Props) => {
    const [contact, setcontact] = useState(String)
    const isAuth = !!localStorage.getItem("token");
    const onFinish = (values: any) => {
        console.log('Success:', values);
        axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/contact/add/',
          data: {
            contact: contact,
          },
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })
          .then(function (response) {
            console.log(response.status);
            if (response.status >= 200 && response.status < 300) {
              notification['success']({
                message: 'You sussessfully add you message',
              });
            }
    
          })
          .catch(function (error) {
            console.log(error);
          });
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
    
      return (
        <div>
        {isAuth ? (<div>
          <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="You comment"
            name="message"
            rules={[{ required: true, message: 'Please input your message here!' }]}
          >
            <Input
                placeholder="title"
                size="large"
                value={contact}
                onChange={(e) => setcontact(e.target.value)}
              />

          </Form.Item>
    
          
    
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form> </div>) : <Redirect to='/login' />}
        </div>
      );
}
