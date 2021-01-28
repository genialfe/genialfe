export interface IQaContent {
  question: string
  answer: string
}

export const content: IQaContent[] = [
  {
    question: 'Genial是做什么的？',
    answer:
      'Genial是1:1的职业社交平台，通过AI算法帮助你每周匹配一个想见的人，通过视频会议的方式见面，助力你的职业生涯。'
  },
  {
    question: 'Genial的使用流程具体是怎样的？',
    answer: `1. 选择目标、兴趣并介绍自己\n2. 选择下一周有空的时间 \n3. 周日晚上平台会将下周你的匹配对象和会议时间通过短信发送给你 \n4. 会议时间前30分钟平台会发送短信提醒，到时间后进入会议室 \n`
  }
]
