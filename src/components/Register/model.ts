export interface IObjCardItem {
  key: number
  name: string
  src: string
  desc: string
  selected: boolean  // 是否被用户选中
}

export interface IObjectives {
  items: string[]
}

export interface IUserProfile {
  userName: string
  objectives: string[]
  interests: string[]
}

export interface IInterestsTag {
  name: string
  desc: string
}

export interface IInterests {
  business: string[]
  sciTech: string[]
  social: string[]
}
