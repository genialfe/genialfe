import React from 'react';
import { Space, Layout, Image, Input, Button} from 'antd';

import { GithubOutlined } from '@ant-design/icons';
import './style.css'
const { Header, Footer, Content } = Layout;

export interface ILoginProps {

}

export default class Login extends React.Component <ILoginProps, any> {

  render() {
    return (
      <div>
        <Space direction="vertical" size="large">
          <Image
            width={200}
            src="https://cdn.pixabay.com/photo/2017/02/20/14/18/technology-2082642__340.jpg"
          />
          <Image
            width={750}
            height={250}
            src="https://cdn.pixabay.com/photo/2017/07/10/23/45/cubes-2492010__340.jpg"
          />
          <Input size="large" style={{marginTop:48}} placeholder="电话号码"></Input>
          <Button size="large" style={{marginTop:12}} block type="primary">登录</Button>
        </Space>
      </div>
    )
  }

}