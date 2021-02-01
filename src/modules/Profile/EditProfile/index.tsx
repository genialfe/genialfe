/* eslint-disable no-restricted-globals */
import React from 'react'
import { Button, Row, Col, Upload, message } from 'antd'
import ImgCrop from 'antd-img-crop'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { action, makeObservable, observable } from 'mobx'
import { observer } from 'mobx-react'
import { editUserProfile, uploadUserAvatar } from '../api'
import { IProfileProps } from '..'

import './style.less'

export interface IEditProfileProps extends IProfileProps {
  onFinishEditting: (value: boolean) => void
}

function beforeUploadAvatar(file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('只能上传JPG/PNG格式的文件')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('图片大小应小于2MB')
  }
  return isJpgOrPng && isLt2M
}

function getBase64(img: any, callback: (imgUrl: any) => void) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

@observer
export default class EditProfile extends React.Component<
  IEditProfileProps,
  any
> {
  isLoading: boolean = false
  imgUrl?: string
  ossUrl: string = ''
  userName: string = ''
  introduction: string = ''

  setIsLoading(value: boolean) {
    this.isLoading = value
  }

  setImgUrl(url: string) {
    this.imgUrl = url
  }

  setOssUrl(url: string) {
    this.ossUrl = url
  }

  setUserName(name: string) {
    this.userName = name
  }

  setIntroduction(introduction: string) {
    this.introduction = introduction
  }

  async handleSubmitProfile() {
    const params = this.ossUrl.length
      ? {
          headImg: this.ossUrl,
          userName: this.userName,
          introduction: this.introduction
        }
      : {
          userName: this.userName,
          introduction: this.introduction
        }

    const editProfileRes = await editUserProfile(params)

    if (editProfileRes.code === 200) {
      const { onFinishEditting } = this.props
      onFinishEditting(false)
      location.reload()
    } else {
      message.info('出错了，请刷新重试')
    }
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
      getBase64(info.file.originFileObj, imgUrl => {
        this.setImgUrl(imgUrl)
        this.setIsLoading(false)
      })
    }
  }

  componentDidMount() {
    const { userName, introduction } = this.props
    this.setIntroduction(introduction)
    this.setUserName(userName)
  }

  constructor(props: IEditProfileProps) {
    super(props)
    makeObservable(this, {
      imgUrl: observable,
      userName: observable,
      introduction: observable,
      isLoading: observable,
      ossUrl: observable,
      setIsLoading: action,
      setImgUrl: action,
      setUserName: action,
      setIntroduction: action,
      setOssUrl: action
    })
  }

  render() {
    const { userName, introduction } = this.props
    const uploadButton = (
      <div>
        {this.isLoading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>换新头像</div>
      </div>
    )

    // 处理上传头像请求
    const uploadAvatar = async (options: any) => {
      const { file, onSuccess, onError } = options
      const formData = new FormData()
      formData.append('file', file)
      try {
        const avatarRes = await uploadUserAvatar(formData)
        console.log('urL:', avatarRes.data)
        onSuccess('Ok')
        if (avatarRes.code === 200) {
          this.setOssUrl(avatarRes.data)
        }
      } catch (err) {
        console.log('upload avatar error: ', err)
        onError({ err })
      }
    }

    return (
      <div className="editContainer">
        <div className="avatar">
          <ImgCrop>
            <Upload
              name="file"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUploadAvatar}
              onChange={this.handleAvatarChange}
              customRequest={uploadAvatar}
            >
              {this.imgUrl ? (
                <img src={this.imgUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </ImgCrop>
        </div>
        <div className="formContainer">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <p className="inputTitle">姓名</p>
              <input
                className="input"
                defaultValue={userName}
                onChange={(e: any) => this.setUserName(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <p className="inputTitle">自我介绍</p>
              <textarea
                className="textAreaInput"
                rows={6}
                defaultValue={introduction}
                onChange={(e: any) => this.setIntroduction(e.target.value)}
              />
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
