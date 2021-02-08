import React from 'react'
import { Row, Col, Button, message } from 'antd'
import { action, makeObservable, observable } from 'mobx'
import { observer } from 'mobx-react'
// import Advice from '../../../static/goals/advice.svg'
// import Brainstorm from '../../../static/goals/brainstorm.svg'
// import Business from '../../../static/goals/business.svg'
// import Cofounder from '../../../static/goals/cofounder.svg'
// import ExploreCompanies from '../../../static/goals/exploreCompanies.svg'
// import ExploreProjects from '../../../static/goals/exploreProjects.svg'
// import Funding from '../../../static/goals/funding.svg'
// import Invest from '../../../static/goals/invest.svg'
// import MeetPeople from '../../../static/goals/meetPeople.svg'
// import Mentor from '../../../static/goals/mentor.svg'
// import StartCompany from '../../../static/goals/startCompany.svg'
// import Team from '../../../static/goals/team.svg'
import Interests from '../Interests'
import SelfIntroduction from '../SelfIntroduction'
import { getObjectivesList, register } from '../apis'

import './style.less'

export interface IGoal {
  id: string
  goal: string
  goalImg: string
}
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
  baseGoals: IGoal[] = []

  items: IGoal[] = [
    {
      id: '1',
      goalImg: 'https://oss.genial.ltd/a8cfd/40067398c2f7ec938e51e4048ed88b14.svg',
      goal: '寻求建议',
    },
    {
      id: '2',
      goalImg: 'https://oss.genial.ltd/a8cfd/ef729701181051036c435382ead26caa.svg',
      goal: '头脑风暴',
    },
    {
      id: '3',
      goalImg: 'https://oss.genial.ltd/a8cfd/1d86f3c32e00691b46d2526de67cba6f.svg',
      goal: '业务发展',
    },
    {
      id: '4',
      goalImg: 'https://oss.genial.ltd/a8cfd/889b9b43deecd4ae6f246d4aa5e91cf2.svg',
      goal: '寻找合作伙伴',
    },
    {
      id: '5',
      goalImg: 'https://oss.genial.ltd/a8cfd/39e3bbba2da086acb0c023f7ad9600c1.svg',
      goal: '寻找创业比赛队友',
    },
    {
      id: '6',
      goalImg: 'https://oss.genial.ltd/a8cfd/9d67d06d30691718024b36be12931059.svg',
      goal: '探索其他公司',
    },
    {
      id: '7',
      goalImg: 'https://oss.genial.ltd/a8cfd/707e2056722500961a1d7534f9be08c5.svg',
      goal: '探索新项目',
    },
    {
      id: '8',
      goalImg: 'https://oss.genial.ltd/a8cfd/93d3fca9d64c357377432ed138bf5f32.svg',
      goal: '筹集资金',
    },
    {
      id: '9',
      goalImg: 'https://oss.genial.ltd/a8cfd/665bdd4be0b0476f71a31504ea0f30fd.svg',
      goal: '投资',
    },
    {
      id: '10',
      goalImg: 'https://oss.genial.ltd/a8cfd/c20ecad48ed187151eef7a649ba67676.svg',
      goal: '遇见有趣的人',
    },
    {
      id: '11',
      goalImg: 'https://oss.genial.ltd/a8cfd/2a4b5c111c7083a34e09607585b2c953.svg',
      goal: '指导别人',
    },
    {
      id: '12',
      goalImg: 'https://oss.genial.ltd/a8cfd/c81f80aa9d3b53f22f3435e3a45aa36d.svg',
      goal: '发展团队',
    }
  ]

  selectedGoalIds: string[] = []

  setBaseGoals(goals: IGoal[]) {
    this.baseGoals = goals
  }

  increCurrentSubStep() {
    this.currentSubStep++
  }

  decreCurrentSubStep() {
    this.currentSubStep--
  }

  setSelectedGoalId(id: string) {
    const index = this.selectedGoalIds.findIndex(goalId => goalId === id)
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

  handleClickObjCard(goalId: string) {
    this.setSelectedGoalId(goalId)
  }

  getObjCardClassName(id: string) {
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
    return this.baseGoals.map((item, index) => {
      return (
        <>
          <Col span={isMobileScreen ? 12 : 6}>
            <div
              className={this.getObjCardClassName(item.id)}
              onClick={() => this.handleClickObjCard(item.id)}
              key={index}
            >
              <img src={item.goalImg} alt={item.goal} className="goalImg" />
              <p className="objCardDesc">{item.goal}</p>
            </div>
          </Col>
        </>
      )
    })
  }

  async getObjectives() {
    const list = await getObjectivesList()
    if (list.data) {
      this.setBaseGoals(list.data as IGoal[])
    } else {
      this.setBaseGoals(this.items)
    }
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
      baseGoals: observable.ref,
      increCurrentSubStep: action,
      decreCurrentSubStep: action,
      setSelectedGoalId: action,
      setBaseGoals: action
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
