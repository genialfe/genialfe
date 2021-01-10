import React from 'react'
import Paper from '@material-ui/core/Paper'
import { ViewState } from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  MonthView,
  Appointments,
  AppointmentTooltip
} from '@devexpress/dx-react-scheduler-material-ui'
import { appointments } from './mockData'

import './style.less'

const currentDate = '2021-01-6'

export interface IMeetingsProps {}

export default class Meetings extends React.Component<IMeetingsProps, any> {
  render() {
    return (
      <div className="meetingsContainer">
        <Paper>
          <Scheduler data={appointments}>
            <ViewState currentDate={currentDate} />
            <MonthView />
            <Appointments />
            <AppointmentTooltip
              showCloseButton
              // showOpenButton
            />
          </Scheduler>
        </Paper>
      </div>
    )
  }
}
