/* eslint-disable no-restricted-globals */
import React from 'react'
import { observer } from 'mobx-react'
import { action, makeObservable, observable } from 'mobx'
import { Button, Tag, Tooltip, Modal, Select, message } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { getInterestsList, getObjectivesList } from '../../Register/apis'
import { IInterest } from '../../Register/Interests'
import { editUserInterests } from '../api'

import './style.less'

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
  /**
   * 用户目标id
   */
  goalIds: string
  /**
   * 用户目标数组 形如['','']
   */
  goalsDefaultValue?: string[]
}

export interface IGoalId {
  goal: string
  id: string
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

  baseGoalsIdsList: IGoalId[] = []

  setBaseGoalsIdsList(list: IGoalId[]) {
    this.baseGoalsIdsList = list
  }

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
      message.info('请至少修改或选择一项')
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
      this.setBaseInterestsList(interestsList)
    } else {
      message.info('获取列表数据失败，请重试')
    }
  }

  async getBaseGoalsList() {
    let goalsIdList
    const res = await getObjectivesList()
    if (res.data) {
      goalsIdList = res.data.map((item: { goal: string; id: string }) => {
        return {
          goal: item.goal,
          id: item.id
        }
      })
      this.setBaseGoalsIdsList(goalsIdList)
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

  handleGoalsSelectChange(value: any) {
    console.log('goals value:', value)
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

  get interestsSelectList() {
    return this.baseInterestsList.map(item => {
      return (
        <Option value={item.interest} key={item.id}>
          {item.interest}
        </Option>
      )
    })
  }

  get goalsSelectList() {
    return this.baseGoalsIdsList.map(item => {
      return (
        <Option value={item.goal} key={item.id}>
          {item.goal}
        </Option>
      )
    })
  }

  componentDidMount() {
    this.getBaseInterestsList()
    this.getBaseGoalsList()
  }

  constructor(props: IUserInterestProps) {
    super(props)
    makeObservable(this, {
      modalVisible: observable,
      confirmLoading: observable,
      baseGoalsIdsList: observable.ref,
      baseInterestsList: observable.ref,
      newInterestsList: observable.ref,
      setModalVisible: action,
      setConfirmLoading: action,
      setNewInterestsList: action,
      setBaseGoalsIdsList: action
    })
  }

  render() {
    const { interests, interestsIds, goalIds, goalsDefaultValue } = this.props

    return (
      <div className="container">
        <p className="introTitle">兴趣</p>
        <div style={{ display: 'flex' }}>
          <div>{this.tagList}</div>
          <div style={{ flex: 1, textAlign: 'right' }}>
            <Tooltip title="修改兴趣">
              <Button
                shape="round"
                icon={<EditOutlined />}
                onClick={() => this.setModalVisible(true)}
              />
            </Tooltip>
          </div>
        </div>
        {/* modal中使用下拉框来增删用户的兴趣和目标 */}
        <Modal
          visible={this.modalVisible}
          onOk={() => this.handleSubmitModalData()}
          confirmLoading={this.confirmLoading}
          onCancel={() => this.handleCancel()}
          cancelText="取消"
          okText="提交"
          title="修改我的兴趣"
        >
          <p className="introTitle">兴趣</p>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="请选择"
            showArrow
            defaultValue={interests.split(',')}
            onChange={(value: any) => this.handleInterestsSelectChange(value)}
          >
            {this.interestsSelectList}
          </Select>

          {/* here to be continued!!!!!!!! */}

          {/* <p className="introTitle" style={{marginTop: '20px'}}>目标</p>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="请选择"
            showArrow
            defaultValue={goalsDefaultValue}
            onChange={(value: any) => this.handleGoalsSelectChange(value)}
          >
            {this.goalsSelectList}
          </Select> */}
        </Modal>
      </div>
    )
  }
}
