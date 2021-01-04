import React from 'react'

import { Typography, Card, Avatar, Button } from 'antd'

import './style.css'

const { Meta } = Card

const { Title, Paragraph, Link } = Typography

export interface IUserCardProps {
  userAvatarLink: string
  userName: string
  userDescription: string
  userDetails: string
}

export default class Usercard extends React.Component<IUserCardProps, any> {
  render() {
    const {
      userAvatarLink,
      userName,
      userDescription,
      userDetails
    } = this.props

    return (
      <div>
        <Card className="card">
          <Meta
            avatar={<Avatar size="large" src={userAvatarLink} />}
            title={userName}
            description={userDescription}
          />
          <Typography style={{ marginTop: 16 }}>
            <Title level={5}>
              希望认识 <Link>{userName}</Link>
            </Title>
            <Paragraph>{userDetails}</Paragraph>
          </Typography>
          <Button size="large" block>
            希望认识{userName}
          </Button>
        </Card>
      </div>
    )
  }
}
