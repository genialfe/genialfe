import React from 'react'
import { Row, Col, Button, message } from 'antd'
import { action, makeObservable, observable } from 'mobx'
import { observer } from 'mobx-react'
import { IObjCardItem } from '../model'
import Advice from '../../../static/goals/advice.svg'
import Brainstorm from '../../../static/goals/brainstorm.svg'
import Business from '../../../static/goals/business.svg'
import Cofounder from '../../../static/goals/cofounder.svg'
import ExploreCompanies from '../../../static/goals/exploreCompanies.svg'
import ExploreProjects from '../../../static/goals/exploreProjects.svg'
import Funding from '../../../static/goals/funding.svg'
import Invest from '../../../static/goals/invest.svg'
import MeetPeople from '../../../static/goals/meetPeople.svg'
import Mentor from '../../../static/goals/mentor.svg'
import StartCompany from '../../../static/goals/startCompany.svg'
import Team from '../../../static/goals/team.svg'
import Interests from '../Interests'
import SelfIntroduction from '../SelfIntroduction'
import { getObjectivesList, register } from '../apis'

import './style.less'

export interface IObjectivesProps {
  /**
   * 向前推进步骤条步骤的方法
   */
  increCurrentStep: () => void
  /**
   * 返回步骤条的上一步骤
   */
  decreCurrentStep: () => void
}

@observer
export default class Objectives extends React.Component<IObjectivesProps, any> {
  currentSubStep: number = 0

  items: IObjCardItem[] = [
    {
      key: 1,
      name: 'advice',
      src: Advice,
      desc: '寻求建议',
      selected: false
    },
    {
      key: 2,
      name: 'brainstorm',
      src: Brainstorm,
      desc: '头脑风暴',
      selected: false
    },
    {
      key: 3,
      name: 'business',
      src: Business,
      desc: '业务发展',
      selected: false
    },
    {
      key: 4,
      name: 'cofounder',
      src: Cofounder,
      desc: '寻找合作伙伴',
      selected: false
    },
    {
      key: 5,
      name: 'startCompany',
      src: StartCompany,
      desc: '寻找创业比赛队友',
      selected: false
    },
    {
      key: 6,
      name: 'exploreCompanies',
      src: ExploreCompanies,
      desc: '探索其他公司',
      selected: false
    },
    {
      key: 7,
      name: 'exploreProjects',
      src: ExploreProjects,
      desc: '探索新项目',
      selected: false
    },
    {
      key: 8,
      name: 'funding',
      src: Funding,
      desc: '筹集资金',
      selected: false
    },
    {
      key: 9,
      name: 'invest',
      src: Invest,
      desc: '投资',
      selected: false
    },
    {
      key: 10,
      name: 'meetPeople',
      src: MeetPeople,
      desc: '遇见有趣的人',
      selected: false
    },
    {
      key: 11,
      name: 'mentor',
      src: Mentor,
      desc: '指导别人',
      selected: false
    },
    {
      key: 12,
      name: 'team',
      src: Team,
      desc: '发展团队',
      selected: false
    }
  ]

  selectedGoalIds: number[] = []

  increCurrentSubStep() {
    this.currentSubStep++
  }

  decreCurrentSubStep() {
    this.currentSubStep--
  }

  switchObjectiveSelected(key: number) {
    // key 从1开始
    const target = !this.items[key - 1].selected
    this.items[key - 1].selected = target
  }

  setSelectedGoalId(id: number) {
    const index = this.selectedGoalIds.findIndex(goalId => goalId === id)
    // console.log("index:", index)
    if (index > -1) {
      // 该id已经在列表中
      this.selectedGoalIds.splice(index, 1)
    } else {
      if (this.selectedGoalIds.length < 3) {
        this.selectedGoalIds.push(id)
      } else {
        message.info('最多选择三项')
      }
    }
  }

  handleClickObjCard(goalId: number) {
    this.setSelectedGoalId(goalId)
  }

  getObjCardClassName(id: number) {
    return this.selectedGoalIds.includes(id) ? 'objCardSelected' : 'objCard'
  }

  async handleSubmitObjectives() {
    const goalIds = this.selectedGoalIds.join()
    sessionStorage.setItem('goalIds', goalIds)
    const id = sessionStorage.getItem('id')
    if (id) {
      const res = await register({
        goalIds,
        id
      })
      if (res.data.status === 1) {
        this.increCurrentSubStep()
      }
    } else {
      message.info('出错了，请尝试重新注册')
    }
  }

  returnPreviousStep() {
    const { decreCurrentStep } = this.props
    decreCurrentStep()
  }

  get objectivesCardList() {
    const isMobileScreen = window.matchMedia('(max-width:500px)').matches
    return this.items.map((item, index) => {
      return (
        <>
          <Col span={isMobileScreen ? 12 : 6}>
            <div
              className={this.getObjCardClassName(item.key)}
              onClick={() => this.handleClickObjCard(item.key)}
              key={index}
            >
              <img src={item.src} alt={item.name} className="goalImg" />
              <p className="objCardDesc">{item.desc}</p>
            </div>
          </Col>
        </>
      )
    })
  }

  async getObjectives() {
    const list = await getObjectivesList()
  }

  componentDidMount() {
    this.getObjectives()
  }

  constructor(props: IObjectivesProps) {
    super(props)

    this.increCurrentSubStep = this.increCurrentSubStep.bind(this)
    this.decreCurrentSubStep = this.decreCurrentSubStep.bind(this)

    makeObservable(this, {
      items: observable,
      currentSubStep: observable,
      selectedGoalIds: observable,
      increCurrentSubStep: action,
      decreCurrentSubStep: action,
      switchObjectiveSelected: action,
      setSelectedGoalId: action
    })
  }

  render() {
    return (
      <>
        {this.currentSubStep === 0 && (
          <div className="objectivesContainer">
            <p className="objectivesHeader">你的目标是什么?</p>
            <p className="objectivesExp">
              最多选择三项。你的目标不会展示给他人，但是能够帮助我们找到适合你的匹配对象。
            </p>
            <Row gutter={[8, 8]}>{this.objectivesCardList}</Row>

            <Button
              className="objButton"
              type="primary"
              onClick={() => this.returnPreviousStep()}
            >
              上一步
            </Button>

            <Button
              className="objButton"
              type="primary"
              onClick={() => this.handleSubmitObjectives()}
            >
              下一步
            </Button>
          </div>
        )}
        {this.currentSubStep === 1 && (
          <Interests
            increStep={this.increCurrentSubStep}
            returnPreviousStep={this.decreCurrentSubStep}
          />
        )}
        {this.currentSubStep === 2 && (
          <SelfIntroduction
            increCurrentStep={this.props.increCurrentStep}
            returnPreviousStep={this.decreCurrentSubStep}
          />
        )}
      </>
    )
  }
}
