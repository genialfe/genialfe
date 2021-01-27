import React from 'react'
import { observer } from 'mobx-react'
import { action, makeObservable, observable } from 'mobx'
import { getMatchesMonthly } from '../api'
import { Empty } from 'antd'

export interface IMatchesProps {}

export interface IMatch {
  id: string
  matchId: string
  signTime: string
}

@observer
export default class Matches extends React.Component<IMatchesProps, any> {
  hasNoMatch: boolean = false
  matches: IMatch[] = []  // 根据api

  setMatches(matches: IMatch[]) {
    this.matches = matches
  }

  setHasNoMatch(value: boolean) {
    this.hasNoMatch = value
  }

  async getMatches() {
    const matchRes = await getMatchesMonthly()
    console.log("matchResL:", matchRes)
    if(matchRes.code === 200) {
      const { data } = matchRes
      if(!data.length) {  // 目前还没有匹配
        this.setHasNoMatch(true)
      }else {
        this.setHasNoMatch(false)
        this.setMatches(data)
      }
    }
  }

  componentDidMount() {
    this.getMatches()
  }

  constructor(props: IMatchesProps) {
    super(props)
    makeObservable(this, {
      matches: observable,
      hasNoMatch: observable,
      setMatches: action,
      setHasNoMatch: action
    })
  }
  
  render() {
    return (
      <div>
        {
          this.hasNoMatch &&
          <Empty 
            description={
              <span>
                暂时还没有匹配
              </span>
            }
          />
        }
      </div>
    )
  }
}
