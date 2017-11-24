// import { findByCUID } from './generalHelpers'

export default function() {

  const { API_ROOT } = require('./api-config')

  const railsHeaders = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }

  const railsPost =  {...railsHeaders, method: 'POST'}

  const railsDestroy = {...railsHeaders, method: 'DELETE'}

  const railsPatch = {...railsHeaders, method: 'PATCH'}

  return {
    employee: {
      fetch: () => {
        return fetch(`${API_ROOT}/companies/1/employees`)
          .then(res => res.json())
      },

      postNew: newEmployee => {
        const body = (({name}) => ({name}))(newEmployee)
        const json = JSON.stringify({...body, is_admin: newEmployee.isAdmin, schedule_color: newEmployee.scheduleColor})
        return fetch(`${API_ROOT}/companies/1/employees`, {
          ...railsPost,
          body: json
        })
          .then(res => res.json())
      }
    },

    schedule: {
      fetch: () => {
        return fetch(`${API_ROOT}/companies/1/master_schedule`)
          .then(res => res.json())
      },

      postNew: newSchedule => {
        const body = (({description}) => ({description}))(newSchedule)
        const json = JSON.stringify({...body, scheduled_start: newSchedule.start, scheduled_end: newSchedule.end})
        return fetch(`${API_ROOT}/companies/1/employees/${newSchedule.employeeID}/schedules`, {
          ...railsPost,
          body: json
        })
          .then(res => res.json())
      },

      patch: schedule => {
        const body = (({description, id}) => ({description, id}))(schedule)
        const json = JSON.stringify({...body, scheduled_start: schedule.start, scheduled_end: schedule.end})
        return fetch(`${API_ROOT}/companies/1/employees/${schedule.employeeID}/schedules/${schedule.id}`, {
          ...railsPatch,
          body: json
        })
          .then(res => res.json())
      },

      destroy: schedule => {
        const json = JSON.stringify({id: schedule.id})
        return fetch(`${API_ROOT}/companies/1/employees/${schedule.employeeID}/schedules/${schedule.id}`, {
          ...railsDestroy,
          body: json
        })
          .then(res => res.json())
      }
    }
  }
}
