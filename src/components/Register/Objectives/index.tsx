import React from 'react'
import { Row, Col, Button} from 'antd'
import { action, makeObservable, observable } from 'mobx'
import { observer } from 'mobx-react'
import { IObjCardItem, IObjectives } from '../model'
import Advice from '../../../static/objectives/advice.svg'
import Brainstorm from '../../../static/objectives/brainstorm.svg'
import Business from '../../../static/objectives/business.svg'
import Cofounder from '../../../static/objectives/cofounder.svg'
import ExploreCompanies from '../../../static/objectives/exploreCompanies.svg'
import ExploreProjects from '../../../static/objectives/exploreProjects.svg'
import Funding from '../../../static/objectives/funding.svg'
import Invest from '../../../static/objectives/invest.svg'
import MeetPeople from '../../../static/objectives/meetPeople.svg'
import Mentor from '../../../static/objectives/mentor.svg'
import StartCompany from '../../../static/objectives/startCompany.svg'
import Team from '../../../static/objectives/team.svg'
import Interests from '../Interests'
import SelfIntroduction from '../SelfIntroduction'

import './style.less'

export interface IObjectivesProps {
  /**
   * 向前推进步骤条步骤的方法
   */
  increCurrentStep: () => void
}

@observer
export default class Objectives extends React.Component<IObjectivesProps, any> {

  currentSubStep: number = 0

  items: IObjCardItem[] = [
    {
      key: 0,
      name: 'advice',
      src: Advice,
      desc: '寻求建议',
      selected: false
    },
    {
      key: 1,
      name: 'brainstorm',
      src: Brainstorm,
      desc: '头脑风暴',
      selected: false
    },
    {
      key: 2,
      name: 'business',
      src: Business,
      desc: '业务发展',
      selected: false
    },
    {
      key: 3,
      name: 'cofounder',
      src: Cofounder,
      desc: '寻找联合创始人',
      selected: false
    },
    {
      key: 4,
      name: 'startCompany',
      src: StartCompany,
      desc: '创建公司',
      selected: false
    },
    {
      key: 5,
      name: 'exploreCompanies',
      src: ExploreCompanies,
      desc: '探索其他公司',
      selected: false
    },
    {
      key: 6,
      name: 'exploreProjects',
      src: ExploreProjects,
      desc: '探索新项目',
      selected: false
    },
    {
      key: 7,
      name: 'funding',
      src: Funding,
      desc: '筹集资金',
      selected: false
    },
    {
      key: 8,
      name: 'invest',
      src: Invest,
      desc: '投资',
      selected: false
    },
    {
      key: 9,
      name: 'meetPeople',
      src: MeetPeople,
      desc: '遇见有趣的人',
      selected: false
    },
    {
      key: 10,
      name: 'mentor',
      src: Mentor,
      desc: '指导别人',
      selected: false
    }, 
    {
      key: 11,
      name: 'team',
      src: Team,
      desc: '发展团队',
      selected: false
    },
  ]
  
  objectives: IObjectives = {
    items: []
  }

  addObjective(objective: string) {
    if(this.objectives.items.indexOf(objective) === -1) {
      this.objectives.items.push(objective)
    }
  }

  increCurrentSubStep() {
    this.currentSubStep ++
  }

  switchObjectiveSelected(key: number) {
    const target = !this.items[key].selected
    this.items[key].selected = target
  }

  handleSubmitObjectives() {
    console.log("objectives:", this.objectives.items)
    let objectives: string[] = []
    this.items.forEach(item => {
      if(item.selected) {
        objectives.push(item.name)
      }
    })
    sessionStorage.setItem('objectives', JSON.stringify(objectives))
    this.increCurrentSubStep()
  }

  get objectivesCardList() {
    return(
      this.items.map((item, index) => {
        const handleClickObjCard = () => {
          this.addObjective(item.name)
          this.switchObjectiveSelected(item.key)
          console.log('objectives:', this.objectives.items)
        }
        return (
          <>
            <Col span={6}>
              <div 
                className={item.selected ? 'objCardSelected' : 'objCard'} 
                onClick={handleClickObjCard}
                key={index}
              >
                <img src={item.src} alt={item.name} />
                <p className='objCardDesc'>{item.desc}</p>
              </div>
            </Col>
          </>
        )
      }) 
    )
  }

  constructor(props:IObjectivesProps) {
    super(props)
    // const { increCurrentStep } = this.props
    this.increCurrentSubStep = this.increCurrentSubStep.bind(this)
    // increCurrentStep =
    // this.increCurrentSubStep = this.increCurrentSubStep.bind(this)
    makeObservable(this,{
      objectives: observable,
      items: observable,
      currentSubStep: observable,
      increCurrentSubStep: action,
      addObjective: action,
      switchObjectiveSelected: action
    })
  }

  render() {
    return (
      <>
        {(this.currentSubStep === 0) &&
          <div className='objectivesContainer'>
            <p className='objectivesHeader'>你的目标是什么?</p>
            <p className='objectivesExp'>
              最多选择三个目标。你的目标不会展示给他人，但是能够帮助我们找到适合你的匹配对象。
            </p>
            <Row gutter={[8, 8]}>
              {this.objectivesCardList}
            </Row>

            <Button
              className='objButton'
              type='primary'
              size='large'
              onClick={() => this.handleSubmitObjectives()}
            >
              下一步
            </Button>
          </div>
        }
        {
          (this.currentSubStep === 1) &&
          <Interests 
            onStepChange={this.increCurrentSubStep}
          />
        }
        {
          (this.currentSubStep === 2) &&
          <SelfIntroduction 
            increCurrentStep={this.props.increCurrentStep}
          />
        }
      </>
    )
  }
}
