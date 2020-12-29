import React, {useState} from 'react'
import axios from 'axios';
import { Modal, Button, Input, Space, Row, Col, notification } from 'antd';
interface Props {
  
}

export const FormForTodo = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const [title, settitle] = useState(String);

  const submitHandler = () => {
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/task-create/',
      data: {
        title: title,
        completed: false,
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
            message: 'You sussessfully add card',
          });
        }

      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',

          paddingBottom: '1rem',
        }}
      >
        <Button type="primary" onClick={() => setVisible(true)}>
          Add new card
        </Button>
      </div>
      <Modal
        title="Add card"
        centered
        visible={visible}
        onOk={() => {
          setVisible(false);
          submitHandler();
        }}
        onCancel={() => setVisible(false)}
        width={500}
      >
        <Row justify="center">
          <Col>
            <Space direction="vertical">
              <Input
                placeholder="title"
                size="large"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
            </Space>
          </Col>
        </Row>
      </Modal>
    </>
  )
}
