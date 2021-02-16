/* eslint-disable no-restricted-globals */
import React, { useReducer, useState } from 'react'
import { Button, message, Collapse, Modal, Drawer, Rate } from 'antd'
import {
  PlusCircleTwoTone,
  PauseCircleTwoTone,
  CloseCircleTwoTone,
  ExclamationCircleOutlined,
  MehOutlined
} from '@ant-design/icons'
import StreamPlayer from 'agora-stream-player'
import { useMediaStream } from './hooks'
import AgoraRTC from './utils/AgoraEnhancer'

import './style.less'
import { submitMeetingFeedback } from '../api'

const { Panel } = Collapse
const { confirm } = Modal

export interface IVideoCallProps {
  /**
   * 视频通话token
   */
  token: string
  /**
   * 视频通话channel(即matchId)
   */
  channel: string
  /**
   * appid
   */
  appid: string
}

const defaultState = {
  appId: '',
  channel: '',
  uid: '',
  token: undefined,
  cameraId: '',
  microphoneId: '',
  mode: 'rtc',
  codec: 'h264'
}

const reducer = (
  state: typeof defaultState,
  action: { type: string; [propName: string]: any }
) => {
  switch (action.type) {
    default:
      return state
    case 'setAppId':
      return {
        ...state,
        appId: action.value
      }
    case 'setChannel':
      return {
        ...state,
        channel: action.value
      }
    case 'setUid':
      return {
        ...state,
        uid: action.value
      }
    case 'setToken':
      return {
        ...state,
        token: action.value
      }
    case 'setCamera':
      return {
        ...state,
        cameraId: action.value
      }
    case 'setMicrophone':
      return {
        ...state,
        microphoneId: action.value
      }
    case 'setMode':
      return {
        ...state,
        mode: action.value
      }
    case 'setCodec':
      return {
        ...state,
        codec: action.value
      }
  }
}

function App(props: IVideoCallProps) {
  const [agoraClient, setClient] = useState<any>(undefined)
  const [isJoined, setisJoined] = useState(false)
  const [isPublished, setIsPublished] = useState(false)
  const [state, dispatch] = useReducer(reducer, defaultState)
  const [isLoading, setIsLoading] = useState(false)
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false)
  const [rate, setRate] = useState(5)
  const [feedback, setFeedback] = useState('')
  const [matchAbsentModalVisible, setMatchAbsentModalVisible] = useState(false)

  // let [localStream, remoteStreamList] = useMediaStream(agoraClient)
  let [localStream, remoteStream] = useMediaStream(agoraClient)

  // Leaves the channel on invoking the function call.
  const leave = async () => {
    setIsLoading(true)
    try {
      if (localStream) {
        // Closes the local stream. This de-allocates the resources and turns off the camera light
        localStream.close()
        // unpublish the stream from the client
        agoraClient.unpublish(localStream)
      }
      // leave the channel
      await agoraClient.leave()
      setIsPublished(false)
      setisJoined(false)
      message.info('断开连接')
    } catch (err) {
      message.error(`失败, 错误：${err}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Starts the video call
  const join = async () => {
    // Creates a new agora client with given parameters.
    // mode can be 'rtc' for real time communications or 'live' for live broadcasting.
    const client = AgoraRTC.createClient({
      mode: state.mode,
      codec: state.codec
    })
    // Loads client into the state
    setClient(client)
    setIsLoading(true)
    try {
      const uid = isNaN(Number(state.uid)) ? null : Number(state.uid)
      const { appid, channel, token } = props

      // initializes the client with appId
      await client.init(appid)

      // joins a channel with a token, channel, user id
      await client.join(token, channel, uid)

      // create a new stream
      const stream = AgoraRTC.createStream({
        streamID: uid || 12345,
        video: true,
        audio: true,
        screen: false,
        cameraId: state.cameraId,
        microphoneId: state.microphoneId
      })

      // stream.setVideoProfile('480p_4')

      // Initalize the stream
      await stream.init()

      // Publish the stream to the channel.
      await client.publish(stream)

      // Set the state appropriately
      setIsPublished(true)
      setisJoined(true)
      message.info(`加入会议${channel}`)
    } catch (err) {
      message.info(`加入会议失败，请使用pc端浏览器或Safari浏览器访问`)
    } finally {
      setIsLoading(false)
    }
  }

  // Used to unpublish the stream.
  const unpublish = () => {
    if (localStream) {
      // unpublish the stream from the client
      agoraClient.unpublish(localStream)
      setIsPublished(false)
      message.info('暂停接入')
    }
  }

  // Publish function to publish the stream to Agora. No need to invoke this after join.
  // This is to be invoke only after an unpublish
  const publish = async () => {
    setIsLoading(true)
    try {
      if (localStream) {
        // Publish the stream to the channel.
        await agoraClient.publish(localStream)
        setIsPublished(true)
      }
      message.info('恢复接入')
    } catch (err) {
      message.error(`恢复接入失败，错误：${err}`)
    } finally {
      setIsLoading(false)
    }
  }

  const leaveRoom = () => {
    // const { channel } = props
    confirm({
      title: '你确定要完全离开会议吗？',
      cancelText: '取消',
      okText: '确认',
      icon: <ExclamationCircleOutlined />,
      content: '离开后可能无法重新加入会议。',
      onOk() {
        leave()
        setFeedbackModalVisible(true)
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }

  const JoinLeaveBtn = () => {
    return (
      <Button
        // color={isJoined ? "secondary" : "primary"}
        onClick={isJoined ? leave : join}
        type="primary"
        // variant="contained"
        disabled={isLoading}
        style={{ margin: '0 12px' }}
      >
        {isJoined ? '断开连接' : '加入会议'}
      </Button>
    )
  }

  const PubUnpubBtn = () => {
    return (
      <Button
        color={isPublished ? 'secondary' : 'default'}
        onClick={isPublished ? unpublish : publish}
        disabled={!isJoined || isLoading}
        style={{ margin: '0 12px' }}
      >
        {isPublished ? '暂停接入' : '恢复接入'}
      </Button>
    )
  }

  const LeaveButton = () => {
    return (
      <Button onClick={leaveRoom} style={{ margin: '0 12px' }}>
        完全离开
      </Button>
    )
  }

  const handleRateChange = (value: number) => {
    setRate(value)
  }

  const handleSubmitMeetingFeedback = async () => {
    const { channel } = props
    const params = {
      matchId: channel,
      star: rate,
      evaluation: feedback
    }
    const res = await submitMeetingFeedback(params)
    if (res.code === 200) {
      const hide = message.success('感谢你的反馈', 0)
      setTimeout(() => {
        hide()
        location.pathname = '/home'
      }, 600)
    }
  }

  const handleMatcherAbsent = () => {
    const { channel } = props
    confirm({
      title: '对方没有进入会议?',
      icon: <MehOutlined />,
      visible: matchAbsentModalVisible,
      content:
        '如果你确认现在是预定的会议时间，并且对方没有加入会议，那么你可以联系13661498269反馈情况。你也可以点击下方的提交按钮，Genial会在核实情况后对无故缺席会议的用户进行一定程度的惩罚。',
      async onOk() {
        const params = {
          evaluation: '对方缺席会议',
          star: -1,
          matchId: channel
        }
        const res = await submitMeetingFeedback(params)
        if (res.code) {
          message.info('提交成功，感谢你的反馈')
          setMatchAbsentModalVisible(false)
        }
      },
      okText: '提交',
      cancelText: '取消'
    })
  }

  const desc = [
    '地狱级别的糟糕!',
    '非常糟糕',
    '糟糕',
    '普通',
    '良好',
    '非常好',
    '印象深刻的优秀!'
  ]

  return (
    <>
      {!feedbackModalVisible && (
        <>
          <div style={{ textAlign: 'center', margin: '26px auto' }}>
            <JoinLeaveBtn />
            <PubUnpubBtn />
            <LeaveButton />

            <div className="explainContainer">
              <Collapse defaultActiveKey="1">
                <Panel header="使用说明" key="1" style={{ textAlign: 'start' }}>
                  <p>
                    <PlusCircleTwoTone twoToneColor="#52c41a" />{' '}
                    点击加入会议按钮，并允许浏览器使用摄像头和麦克风，即可加入视频会议。
                  </p>
                  <p>
                    <PauseCircleTwoTone />{' '}
                    点击暂停接入按钮，你的视频和音频就会暂时不会被对方看到和听到。
                  </p>
                  <p>
                    <CloseCircleTwoTone twoToneColor="#eb2f96" />{' '}
                    会议结束后点击完全离开按钮，所有的连接都会被断开，你也会离开会议页面。
                  </p>
                  <p>双方都接入后，就开始和你的匹配对象打一声招呼吧！</p>
                  <p className="absentAlert" onClick={handleMatcherAbsent}>
                    对方没有进入会议？
                  </p>
                </Panel>
              </Collapse>
            </div>
          </div>
          <div className="videoMeetingContainer">
            <div style={{ width: '50%' }}>
              {localStream && (
                <StreamPlayer stream={localStream} fit="contain" />
              )}
            </div>
            <div style={{ width: '50%' }}>
              {remoteStream && (
                <StreamPlayer stream={remoteStream} fit="contain" />
              )}
            </div>
          </div>
        </>
      )}
      {feedbackModalVisible && (
        <div className="meetingFeedbackContainer">
          <div style={{ margin: '1.4em', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', fontWeight: 400 }}>
              给刚才的会议体验打个分吧!
            </p>
            <Rate count={7} onChange={handleRateChange} value={rate} />
            <p style={{ color: 'gray', marginTop: '10px' }}>
              {rate ? desc[rate - 1] : ''}
            </p>
            <textarea
              className="textAreaInput"
              rows={6}
              placeholder="有什么想要反馈的吗？"
              value={feedback}
              onChange={(e: any) => setFeedback(e.target.value)}
            />
            <Button type="primary" onClick={handleSubmitMeetingFeedback}>
              提交
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default function VideoCall(props: IVideoCallProps) {
  return <App {...props} />
}
