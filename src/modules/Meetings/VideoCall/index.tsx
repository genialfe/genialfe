import React, { useReducer, useState } from 'react'
import { Button, message } from 'antd'
import StreamPlayer from 'agora-stream-player'
import { useMediaStream } from './hooks'
import AgoraRTC from './utils/AgoraEnhancer'

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

  let [localStream, remoteStreamList] = useMediaStream(agoraClient)

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
      message.info('离开频道')
    } catch (err) {
      message.error(`离开频道失败, 错误：${err}`)
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
      message.info(`加入会议${state.channel}`)
    } catch (err) {
      message.info(`加入会议失败，错误：${err}`)
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
        {isJoined ? '离开会议' : '加入会议'}
      </Button>
    )
  }

  const PubUnpubBtn = () => {
    return (
      <Button
        color={isPublished ? 'secondary' : 'default'}
        onClick={isPublished ? unpublish : publish}
        // variant="contained"
        disabled={!isJoined || isLoading}
        style={{ margin: '0 12px' }}
      >
        {isPublished ? '暂停接入' : '恢复接入'}
      </Button>
    )
  }

  return (
    <>
      <div style={{ textAlign: 'center', margin: '26px auto' }}>
        <JoinLeaveBtn />
        <PubUnpubBtn />
      </div>
      <div style={{ display: 'flex', height: '200px' }}>
        <div style={{ width: '50%' }}>
          {localStream && (
            <StreamPlayer stream={localStream} fit="contain" label="local" />
          )}
        </div>
        <div style={{ width: '50%' }}>
          {remoteStreamList.map((stream: any) => (
            <StreamPlayer
              key={stream.getId()}
              stream={stream}
              fit="contain"
              label={stream.getId()}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default function VideoCall(props: IVideoCallProps) {
  console.log('videocallProps:', props)
  return <App {...props} />
}
