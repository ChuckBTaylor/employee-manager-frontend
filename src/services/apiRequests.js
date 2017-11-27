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

      post: newEmployee => {
        const body = (({name}) => ({name}))(newEmployee)
        const json = JSON.stringify({...body, is_admin: newEmployee.isAdmin, schedule_color: newEmployee.scheduleColor})
        return fetch(`${API_ROOT}/companies/1/employees`, {
          ...railsPost,
          body: json
        })
          .then(res => res.json())
      },

      patch: employee => {
        const body = (({name}) => ({name}))(employee)
        const json = JSON.stringify({...body, is_admin: employee.isAdmin, schedule_color: employee.scheduleColor})
        return fetch(`${API_ROOT}/companies/1/employees/${employee.id}`, {
          ...railsPatch,
          body: json
        })
          .then(res => res.json())
      },

      destroy: employee => {
        const json = JSON.stringify({id: employee.id})
        return fetch(`${API_ROOT}/companies/1/employees/${employee.id}`, {
          ...railsDestroy,
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

      post: newSchedule => {
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
    },

    service: {
      fetch: () => {
        return fetch(`${API_ROOT}/companies/1/services`)
          .then(res => res.json())
      },

      post: newService => {
        const body = (({name}) => ({name}))(newService)
        const json = JSON.stringify({...body})
        return fetch(`${API_ROOT}/companies/1/services`, {
          ...railsPost,
          body: json
        })
          .then(res => res.json())
      },

      patch: service => {
        const body = (({name}) => ({name}))(service)
        const json = JSON.stringify({...body})
        return fetch(`${API_ROOT}/companies/1/services/${service.id}`, {
          ...railsPatch,
          body: json
        })
          .then(res => res.json())
      },

      destroy: service => {
        const json = JSON.stringify({id: service.id})
        return fetch(`${API_ROOT}/companies/1/services/${service.id}`, {
          ...railsDestroy,
          body: json
        })
          .then(res => res.json())
      }
    },

    client: {
      fetch: () => {
        return fetch(`${API_ROOT}/companies/1/clients`)
          .then(res => res.json())
      },

      post: newClient => {
        const body = (({name}) => ({name}))(newClient)
        const json = JSON.stringify({...body})
        return fetch(`${API_ROOT}/companies/1/clients`, {
          ...railsPost,
          body: json
        })
          .then(res => res.json())
      },

      patch: client => {
        const body = (({name}) => ({name}))(client)
        const json = JSON.stringify({...body})
        return fetch(`${API_ROOT}/companies/1/clients/${client.id}`, {
          ...railsPatch,
          body: json
        })
          .then(res => res.json())
      },

      destroy: client => {
        const json = JSON.stringify({id: client.id})
        return fetch(`${API_ROOT}/companies/1/clients/${client.id}`, {
          ...railsDestroy,
          body: json
        })
          .then(res => res.json())
      }
    },

    project: {
      fetch: () => {
        return fetch(`${API_ROOT}/companies/1/all_projects`)
          .then(res => res.json())
      },

      post: newProject => {
        const body = (({name}) => ({name}))(newProject)
        const json = JSON.stringify({...body})
        return fetch(`${API_ROOT}/companies/1/clients/${newProject.clientID}/projects`, {
          ...railsPost,
          body: json
        })
          .then(res => res.json())
      },

      patch: project => {
        const body = (({name}) => ({name}))(project)
        const json = JSON.stringify({...body})
        return fetch(`${API_ROOT}/companies/1/clients/${project.clientID}/projects/${project.id}`, {
          ...railsPatch,
          body: json
        })
          .then(res => res.json())
      },

      destroy: project => {
        const json = JSON.stringify({id: project.id})
        return fetch(`${API_ROOT}/companies/1/clients/${project.clientID}`, {
          ...railsDestroy,
          body: json
        })
          .then(res => res.json())
      }
    },

    piece: {
      fetch: () => {
        return fetch(`${API_ROOT}/companies/1/all_pieces`)
          .then(res => res.json())
      },

      post: newPiece => {
        const body = (({name}) => ({name}))(newPiece)
        const json = JSON.stringify({...body})
        return fetch(`${API_ROOT}/companies/1/clients/${newPiece.clientID}/projects/${newPiece.projectID}/pieces`, {
          ...railsPost,
          body: json
        })
          .then(res => res.json())
      },

      patch: piece => {
        const body = (({name}) => ({name}))(piece)
        const json = JSON.stringify({...body})
        return fetch(`${API_ROOT}/companies/1/clients/${piece.clientID}/projects/${piece.projectID}/pieces/${piece.id}`, {
          ...railsPatch,
          body: json
        })
          .then(res => res.json())
      },

      destroy: piece => {
        const json = JSON.stringify({id: piece.id})
        return fetch(`${API_ROOT}/companies/1/clients/${piece.clientID}/projects/${piece.projectID}/pieces/${piece.id}`, {
          ...railsDestroy,
          body: json
        })
          .then(res => res.json())
      }
    }
  }
}
