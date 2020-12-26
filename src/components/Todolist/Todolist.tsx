import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { FormForTodo } from './FormForTodo';

import { Card, Row, Col, notification} from 'antd';
import { DeleteOutlined} from '@ant-design/icons'
import { Redirect } from 'react-router-dom';

interface Props {
    
}

export const Todolist = (props: Props) => {
    const [todo, settodo] = useState([])
    const isAuth = !!localStorage.getItem("token");
    interface myState {
        id: string;
        title: string;
        completed: boolean;
      }
    useEffect(() => {
        
        axios.get('http://127.0.0.1:8000/task-list/').then((res) => {
        try {
              settodo(res.data);
              console.log(res.data)
          } catch (error) {
            console.log(error);
          }
        });
        return () => {

        }
      }, []);

      const deleteHandler = (id: string) => {
        axios.delete(`http://127.0.0.1:8000/task-delete/${id}`);
        notification['success']({
          message: 'You sussessfully delete card',
        });
      };
    return (
    <div> {isAuth ? ( <div><FormForTodo />
      <div>
        {todo.map((todos: myState) => {
          return ( 
            <Row justify="space-around" key={todos.id} >
              <Col span={8}>
                <Card 
                  key={todos.id}
                  hoverable
                  style={{ marginBottom: '1rem', textAlign: 'center' }}
                  cover={
                  <h1>{todos.title}</h1>
}
                  actions={[
                    <DeleteOutlined
                      key="delete"
                      onClick={() => deleteHandler(todos.id)}
                    />,
                  ]}
                >
                </Card>
              </Col>
            </Row>
          );
        })}
      </div>
    </div>) : <Redirect to='/login' />}
    </div>
    )
}
