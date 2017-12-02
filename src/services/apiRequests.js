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
        const body = (({name, id}) => ({name, id}))(employee)
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
        const body = (({name, id}) => ({name, id}))(service)
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
        const body = (({name, id}) => ({name, id}))(client)
        const json = JSON.stringify({...body})
        return fetch(`${API_ROOT}/companies/1/clients/${client.id}`, {
          ...railsPatch,
          body: json
        })
          .then(res => res.json())
      },

      destroy: client => {
        const json = JSON.stringify({id: client.id})
        console.log("Deleting Client", client);
        return fetch(`${API_ROOT}/companies/1/clients/${client.id}`, {
          ...railsDestroy,
          body: json
        })
          .then(res => res.json())
      }
    },

    project: {
      fetch: () => {
        return fetch(`${API_ROOT}/companies/1/projects`)
          .then(res => res.json())
      },

      post: newProject => {
        const body = (({name, complete}) => ({name, complete}))(newProject)
        const json = JSON.stringify({...body, client_id: newProject.clientID})
        return fetch(`${API_ROOT}/companies/1/projects`, {
          ...railsPost,
          body: json
        })
          .then(res => res.json())
      },

      patch: project => {
        const body = (({name, id}) => ({name, id}))(project)
        const json = JSON.stringify({...body})
        return fetch(`${API_ROOT}/companies/1/projects/${project.id}`, {
          ...railsPatch,
          body: json
        })
          .then(res => res.json())
      },

      destroy: project => {
        const json = JSON.stringify({id: project.id})
        return fetch(`${API_ROOT}/companies/1/projects/${project.id}`, {
          ...railsDestroy,
          body: json
        })
          .then(res => res.json())
      }
    },

    piece: {
      fetch: () => {
        return fetch(`${API_ROOT}/companies/1/pieces`)
          .then(res => res.json())
      },

      post: newPiece => {
        const body = (({name, complete}) => ({name, complete}))(newPiece)
        const json = JSON.stringify({...body, project_id: newPiece.projectID, service_ids: newPiece.serviceIDs})
        return fetch(`${API_ROOT}/companies/1/pieces`, {
          ...railsPost,
          body: json
        })
          .then(res => res.json())
      },

      patch: piece => {
        const body = (({name, id}) => ({name, id}))(piece)
        const json = JSON.stringify({...body, service_ids: piece.serviceIDs})
        return fetch(`${API_ROOT}/companies/1/pieces/${piece.id}`, {
          ...railsPatch,
          body: json
        })
          .then(res => res.json())
      },

      destroy: piece => {
        const json = JSON.stringify({id: piece.id})
        return fetch(`${API_ROOT}/companies/1/pieces/${piece.id}`, {
          ...railsDestroy,
          body: json
        })
          .then(res => res.json())
      }
    },

    procedure: {
      fetch: () => {
        return fetch(`${API_ROOT}/companies/1/procedures`)
          .then(res => res.json())
      },

      patch: procedure => {
        const body = (({id, complete}) => ({id, complete}))(procedure)
        const json = JSON.stringify({...body, service_id: procedure.serviceID, piece_id: procedure.pieceID, estimated_time: procedure.estimatedTime})
        return fetch(`${API_ROOT}/companies/1/procedures/${procedure.id}`, {
          ...railsPatch,
          body: json
        })
          .then(res => res.json())
      }
    },

    operation: {
      fetch: () => {
        return fetch(`${API_ROOT}/companies/1/operations`)
          .then(res => res.json())
      },

      fetchWeek: planner_id => {
        return fetch(`${API_ROOT}/companies/1/operations/week/${planner_id}`)
          .then(res => res.json())
      }
    },

    planner: {
      fetchProjects: monday => {
        return fetch(`${API_ROOT}/companies/1/planners/${monday}`)
          .then(res => res.json())
      },

      fetch: () => {
        return fetch(`${API_ROOT}/companies/1/planners`)
          .then(res => res.json())
      },

      post: () => {
        return fetch(`${API_ROOT}/companies/1/planners`, {
          ...railsPost
        })
          .then(res => res.json())
      },

      addToPlanner: (project_id, id) => { //projectID, plannerID
        const body = {planner: {project_id, id}}
        const json = JSON.stringify(body)
        return fetch(`${API_ROOT}/companies/1/planners/${id}/add_project`, {
          ...railsPost,
          body: json
        })
          .then(res => res.json())
      },

      removeFromPlanner: (project_id, id) => { //projectID, plannerID
        const body = {planner: {project_id, id}}
        const json = JSON.stringify(body)
        return fetch(`${API_ROOT}/companies/1/planners/${id}/remove_project`, {
          ...railsDestroy,
          body: json
        })
          .then(res => res.json())
      }
    }
  }
}
