import React from 'react'
import { Button, Row, Col, Upload, message } from 'antd'
import ImgCrop from 'antd-img-crop'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { action, makeObservable, observable } from 'mobx'
import { observer } from 'mobx-react'
import Cookies from 'universal-cookie'
import { getUserProfile } from '../api'
import { API_PREFIX } from '../../constants'

import './style.less'

const cookies = new Cookies()

export interface IEditProfileProps {
  onFinishEditting: (value: boolean) => void
}

function beforeUploadAvatar(file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传JPG/PNG格式的文件');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小应小于2MB');
  }
  return isJpgOrPng && isLt2M;
}

function getBase64(img: any, callback: (imgUrl: any) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

@observer
export default class EditProfile extends React.Component<
  IEditProfileProps,
  any
> {
  isLoading: boolean = false
  imgUrl?: string
  userName: string = ''
  selfIntroduction: string = ''

  setIsLoading(value: boolean) {
    this.isLoading = value
  }

  setImgUrl(url: string) {
    this.imgUrl = url
  }

  handleSubmitProfile() {
    // send request here

    const { onFinishEditting } = this.props
    // 结束编辑后 把是否在编辑模式 设置为false
    onFinishEditting(false)
  }

  handleCancelEdit() {
    const { onFinishEditting } = this.props
    onFinishEditting(false)
  }

  handleAvatarChange = (info: any) => {
    if (info.file.status === 'uploading') {
      this.setIsLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imgUrl) => {
        this.setImgUrl(imgUrl)
        this.setIsLoading(false)
      })
    }
  };

  async getUserProfile() {
    const profileRes = await getUserProfile()
    console.log("profile:", profileRes)
  }

  get avatarUploadHeaders() {
    const token = cookies.get('token')
    return {
      Authorization: token ? token : '',
    }
  }

  componentDidMount() {
    this.getUserProfile()
  }

  constructor(props: IEditProfileProps) {
    super(props)
    makeObservable(this, {
      imgUrl: observable,
      userName: observable,
      selfIntroduction: observable,
      isLoading: observable,
      setIsLoading: action,
      setImgUrl: action
    })
  }

  render() {
    const uploadButton = (
      <div>
        {this.isLoading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>上传头像</div>
      </div>
    );
    return (
      <div className="editContainer">
        <div className="avatar">
          <ImgCrop>
            <Upload
              name="file"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={`${API_PREFIX}/info/head`}
              headers={this.avatarUploadHeaders}
              beforeUpload={beforeUploadAvatar}
              onChange={this.handleAvatarChange}
            >
              {this.imgUrl ? <img src={this.imgUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </ImgCrop>
        </div>
        <div className="formContainer">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <p className="inputTitle">姓名</p>
              <input className="input" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <p className="inputTitle">自我介绍</p>
              <textarea className="textAreaInput" rows={6} />
            </Col>
          </Row>
        </div>

        <Button
          type="primary"
          onClick={() => this.handleCancelEdit()}
          className="button"
        >
          返回
        </Button>

        <Button
          type="primary"
          onClick={() => this.handleSubmitProfile()}
          className="button"
        >
          提交
        </Button>
      </div>
    )
  }
}
