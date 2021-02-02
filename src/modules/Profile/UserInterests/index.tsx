/* eslint-disable no-restricted-globals */
import React from 'react'
import { observer } from 'mobx-react'
import { action, makeObservable, observable } from 'mobx'
import { Button, Tag, Tooltip, Modal, Select, message } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { getInterestsList } from '../../Register/apis'
import { IInterest } from '../../Register/Interests'

import './style.less'
import { editUserInterests, getUserProfile } from '../api'

const { Option } = Select

export interface IUserInterestProps {
  /**
   * 用户兴趣
   */
  interests: string
  /**
   * 用户兴趣id
   */
  interestsIds?: string
  /**
   * 用户目标id
   */
  goalIds?: string
}

@observer
export default class UserInterests extends React.Component<
  IUserInterestProps,
  any
> {
  modalVisible: boolean = false
  confirmLoading: boolean = false
  baseInterestsList: IInterest[] = []
  newInterestsList: string[] = []
  newInterestsIdList: string[] = []

  setModalVisible(visible: boolean) {
    this.modalVisible = visible
  }

  setConfirmLoading(loading: boolean) {
    this.confirmLoading = loading
  }

  setBaseInterestsList(list: IInterest[]) {
    this.baseInterestsList = list
  }

  setNewInterestsList(list: string[]) {
    this.newInterestsList = list
  }

  setNewInterestsIdList(list: string[]) {
    this.newInterestsIdList = list
  }

  async handleSubmitModalData() {
    this.setConfirmLoading(true)
    const interest = this.newInterestsList.join(',')
    const interestIds = this.newInterestsIdList.join(',')
    const res = await editUserInterests(interest, interestIds)
    if (res.code === 200) {
      this.setModalVisible(false)
      this.setConfirmLoading(false)
      location.reload()
    } else {
      message.info('请至少选择一项')
      this.setConfirmLoading(false)
    }
  }

  handleCancel() {
    this.setModalVisible(false)
  }

  async getBaseInterestsList() {
    let interestsList = []
    const res = await getInterestsList()
    if (res.code === 200) {
      const { data } = res
      interestsList = [...data[0].list, ...data[1].list, ...data[2].list]
      console.log('intereLIST:', interestsList)
      this.setBaseInterestsList(interestsList)
    } else {
      message.info('获取列表数据失败，请重试')
    }
  }

  handleInterestsSelectChange(value: any) {
    this.setNewInterestsList(value)
    const idArray = this.newInterestsList.map(item => {
      return this.baseInterestsList.find(
        baseItem => baseItem.interest === item
      )!.id
    })
    this.setNewInterestsIdList(idArray)
  }

  get tagList() {
    const { interests } = this.props
    const interestsArray = interests.split(',')
    return interestsArray.map((item, index) => {
      return (
        <Tag color="#333366" key={index} className="tag">
          {item}
        </Tag>
      )
    })
  }

  get interestsList() {
    const interestsList: any[] = []
    for (let i = 10; i < 36; i++) {
      interestsList.push(
        <Option value={i} key={i.toString(36) + i}>
          {i.toString(36) + i}
        </Option>
      )
    }
    return interestsList
  }

  componentDidMount() {
    this.getBaseInterestsList()
  }

  constructor(props: IUserInterestProps) {
    super(props)
    makeObservable(this, {
      modalVisible: observable,
      confirmLoading: observable,
      baseInterestsList: observable.ref,
      newInterestsList: observable.ref,
      setModalVisible: action,
      setConfirmLoading: action,
      setNewInterestsList: action
    })
  }

  render() {
    const { interests, interestsIds, goalIds } = this.props
    const interestsSelectList = this.baseInterestsList.map(item => {
      return (
        <Option value={item.interest} key={item.id}>
          {item.interest}
        </Option>
      )
    })
    return (
      <div className="container">
        <p className="introTitle">兴趣</p>
        <div style={{ display: 'flex' }}>
          <div>{this.tagList}</div>
          <div style={{ flex: 1, textAlign: 'right' }}>
            <Tooltip title="修改兴趣和目标">
              <Button
                shape="round"
                icon={<EditOutlined />}
                onClick={() => this.setModalVisible(true)}
              />
            </Tooltip>
          </div>
        </div>
        {/* modal中使用下拉框来增删用户的兴趣 */}
        <Modal
          visible={this.modalVisible}
          onOk={() => this.handleSubmitModalData()}
          confirmLoading={this.confirmLoading}
          onCancel={() => this.handleCancel()}
          title="修改我的兴趣"
        >
          <p className="introTitle">兴趣</p>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            showArrow
            defaultValue={interests.split(',')}
            onChange={(value: any) => this.handleInterestsSelectChange(value)}
          >
            {interestsSelectList}
          </Select>
        </Modal>
      </div>
    )
  }
}
