export interface IQaContent {
  question: string
  answer: string
}

export const content: IQaContent[] = [
  {
    question: 'Genial是做什么的？',
    answer:
      'Genial是1:1的职业社交平台，通过AI算法帮助你每周匹配一个想见的人，通过视频会议的方式见面，助力你的生涯发展。'
  },
  {
    question: 'Genial的使用流程具体是怎样的？',
    answer: `1. 选择目标、兴趣并介绍自己; 2. 选择下一周有空的时间; 3. 周日晚上平台会将下周你的匹配对象和会议时间通过短信发送给你; 4. 会议时间前30分钟平台会发送短信提醒，到时间后进入会议室。`
  },
  {
    question: '如何提升自己的体验？',
    answer: `完善自己的资料，AI将会提供更适合你的匹配对象；使用Genial平台上的积分`
  },
  {
    question: '如何使用积分？',
    answer: `特定的匹配需求
    如果你想要寻找特定需求的匹配，则每次匹配30积分。
    进行多次匹配
    如果你想要一周进行一次以上的匹配，则每增加一次10积分。
    `
  },
  {
    question: '如何获得积分？',
    answer: `完成一次会议                                                 积分+2
    邀请朋友加入Genial                                       积分+5
    邀请的朋友参加第一次会议                          积分+5
    
    `
  },
  {
    question: '如何联系我们',
    answer: `有任何问题或建议可发送邮件到genialtech@126.com，并备注你的手机号
    如果你有紧急的问题需要解决，可拨打13661498269
    `
  }
]
