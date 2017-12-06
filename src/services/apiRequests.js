

export default function() {

  const companyID = () => {
    const decoder = require('jwt-decode')
    const decoded = decoder(localStorage.getItem('jwtToken'))
    return decoded.company_id
  }

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
        return fetch(`${API_ROOT}/companies/${companyID()}/employees`)
          .then(res => res.json())
      },

      post: newEmployee => {
        const body = (({name, password}) => ({name, password}))(newEmployee)
        const json = JSON.stringify({employee: {...body, is_admin: newEmployee.isAdmin, schedule_color: newEmployee.scheduleColor, password_confirmation: newEmployee.passwordConfirmation}})
        return fetch(`${API_ROOT}/companies/${companyID()}/employees`, {
          ...railsPost,
          body: json
        })
          .then(res => res.json())
      },

      patch: employee => {
        const body = (({name, id}) => ({name, id}))(employee)
        const json = JSON.stringify({...body, is_admin: employee.isAdmin, schedule_color: employee.scheduleColor})
        return fetch(`${API_ROOT}/companies/${companyID()}/employees/${employee.id}`, {
          ...railsPatch,
          body: json
        })
          .then(res => res.json())
      },

      destroy: employee => {
        const json = JSON.stringify({id: employee.id})
        return fetch(`${API_ROOT}/companies/${companyID()}/employees/${employee.id}`, {
          ...railsDestroy,
          body: json
        })
          .then(res => res.json())
      },

      logIn: employee => {
        console.log(employee, 'from apiRequests');
        const json = JSON.stringify({name: employee.name, password: employee.password})
        return fetch(`${API_ROOT}/login`, {
          ...railsPost,
          body: json
        })
          .then(res => res.json())
      }
    },

    schedule: {
      fetch: () => {
        return fetch(`${API_ROOT}/companies/${companyID()}/master_schedule`)
          .then(res => res.json())
      },

      post: newSchedule => {
        const body = (({description}) => ({description}))(newSchedule)
        const json = JSON.stringify({...body, scheduled_start: newSchedule.start, scheduled_end: newSchedule.end})
        return fetch(`${API_ROOT}/companies/${companyID()}/employees/${newSchedule.employeeID}/schedules`, {
          ...railsPost,
          body: json
        })
          .then(res => res.json())
      },

      patch: schedule => {
        const body = (({description, id}) => ({description, id}))(schedule)
        const json = JSON.stringify({...body, scheduled_start: schedule.start, scheduled_end: schedule.end})
        return fetch(`${API_ROOT}/companies/${companyID()}/employees/${schedule.employeeID}/schedules/${schedule.id}`, {
          ...railsPatch,
          body: json
        })
          .then(res => res.json())
      },

      destroy: schedule => {
        const json = JSON.stringify({id: schedule.id})
        return fetch(`${API_ROOT}/companies/${companyID()}/employees/${schedule.employeeID}/schedules/${schedule.id}`, {
          ...railsDestroy,
          body: json
        })
          .then(res => res.json())
      }
    },

    service: {
      fetch: () => {
        return fetch(`${API_ROOT}/companies/${companyID()}/services`)
          .then(res => res.json())
      },

      post: newService => {
        const body = (({name}) => ({name}))(newService)
        const json = JSON.stringify({...body})
        return fetch(`${API_ROOT}/companies/${companyID()}/services`, {
          ...railsPost,
          body: json
        })
          .then(res => res.json())
      },

      patch: service => {
        const body = (({name, id}) => ({name, id}))(service)
        const json = JSON.stringify({...body})
        return fetch(`${API_ROOT}/companies/${companyID()}/services/${service.id}`, {
          ...railsPatch,
          body: json
        })
          .then(res => res.json())
      },

      destroy: service => {
        const json = JSON.stringify({id: service.id})
        return fetch(`${API_ROOT}/companies/${companyID()}/services/${service.id}`, {
          ...railsDestroy,
          body: json
        })
          .then(res => res.json())
      }
    },

    client: {
      fetch: () => {
        return fetch(`${API_ROOT}/companies/${companyID()}/clients`)
          .then(res => res.json())
      },

      post: newClient => {
        const body = (({name}) => ({name}))(newClient)
        const json = JSON.stringify({...body})
        return fetch(`${API_ROOT}/companies/${companyID()}/clients`, {
          ...railsPost,
          body: json
        })
          .then(res => res.json())
      },

      patch: client => {
        const body = (({name, id}) => ({name, id}))(client)
        const json = JSON.stringify({...body})
        return fetch(`${API_ROOT}/companies/${companyID()}/clients/${client.id}`, {
          ...railsPatch,
          body: json
        })
          .then(res => res.json())
      },

      destroy: client => {
        const json = JSON.stringify({id: client.id})
        console.log("Deleting Client", client);
        return fetch(`${API_ROOT}/companies/${companyID()}/clients/${client.id}`, {
          ...railsDestroy,
          body: json
        })
          .then(res => res.json())
      }
    },

    project: {
      fetch: () => {
        return fetch(`${API_ROOT}/companies/${companyID()}/projects`)
          .then(res => res.json())
      },

      post: newProject => {
        const body = (({name, complete}) => ({name, complete}))(newProject)
        const json = JSON.stringify({...body, client_id: newProject.clientID})
        return fetch(`${API_ROOT}/companies/${companyID()}/projects`, {
          ...railsPost,
          body: json
        })
          .then(res => res.json())
      },

      show: projectID => {
        return fetch(`${API_ROOT}/companies/${companyID()}/projects/${projectID}`)
          .then(res => res.json())
      },

      patch: project => {
        const body = (({name, id}) => ({name, id}))(project)
        const json = JSON.stringify({...body})
        return fetch(`${API_ROOT}/companies/${companyID()}/projects/${project.id}`, {
          ...railsPatch,
          body: json
        })
          .then(res => res.json())
      },

      destroy: project => {
        const json = JSON.stringify({id: project.id})
        return fetch(`${API_ROOT}/companies/${companyID()}/projects/${project.id}`, {
          ...railsDestroy,
          body: json
        })
          .then(res => res.json())
      }
    },

    piece: {
      fetch: () => {
        return fetch(`${API_ROOT}/companies/${companyID()}/pieces`)
          .then(res => res.json())
      },

      post: newPiece => {
        const body = (({name, complete}) => ({name, complete}))(newPiece)
        const json = JSON.stringify({...body, project_id: newPiece.projectID, service_ids: newPiece.serviceIDs})
        return fetch(`${API_ROOT}/companies/${companyID()}/pieces`, {
          ...railsPost,
          body: json
        })
          .then(res => res.json())
      },

      patch: piece => {
        const body = (({name, id}) => ({name, id}))(piece)
        const json = JSON.stringify({...body, service_ids: piece.serviceIDs})
        return fetch(`${API_ROOT}/companies/${companyID()}/pieces/${piece.id}`, {
          ...railsPatch,
          body: json
        })
          .then(res => res.json())
      },

      destroy: piece => {
        const json = JSON.stringify({id: piece.id})
        return fetch(`${API_ROOT}/companies/${companyID()}/pieces/${piece.id}`, {
          ...railsDestroy,
          body: json
        })
          .then(res => res.json())
      }
    },

    procedure: {
      fetch: () => {
        return fetch(`${API_ROOT}/companies/${companyID()}/procedures`)
          .then(res => res.json())
      },

      patch: procedure => {
        const body = (({id, complete}) => ({id, complete}))(procedure)
        const json = JSON.stringify({...body, service_id: procedure.serviceID, piece_id: procedure.pieceID, estimated_time: procedure.estimatedTime})
        return fetch(`${API_ROOT}/companies/${companyID()}/procedures/${procedure.id}`, {
          ...railsPatch,
          body: json
        })
          .then(res => res.json())
      }
    },

    operation: {
      fetch: () => {
        return fetch(`${API_ROOT}/companies/${companyID()}/operations`)
          .then(res => res.json())
      },

      fetchWeek: planner_id => {
        return fetch(`${API_ROOT}/companies/${companyID()}/operations/week/${planner_id}`)
          .then(res => res.json())
      },

      post: operation => {
        const body = (({hours}) => ({hours}))(operation)
        const json = JSON.stringify({...body, planner_id: operation.plannerID, employee_id: operation.employeeID, planners_procedure_id: operation.ppID})
        return fetch(`${API_ROOT}/companies/${companyID()}/operations`, {
          ...railsPost,
          body: json
        })
          .then(res => res.json())
      },

      patch: operation => {
        const body = (({hours, id}) => ({hours, id}))(operation)
        const json = JSON.stringify({...body})
        return fetch(`${API_ROOT}/companies/${companyID()}/operations/${operation.id}`, {
          ...railsPatch,
          body: json
        })
          .then(res => res.json())
      }
    },

    planner: {
      fetchPPs: monday => {
        return fetch(`${API_ROOT}/companies/${companyID()}/planners/${monday}`)
          .then(res => res.json())
      },

      fetch: () => {
        return fetch(`${API_ROOT}/companies/${companyID()}/planners`)
          .then(res => res.json())
      },

      post: () => {
        return fetch(`${API_ROOT}/companies/${companyID()}/planners`, {
          ...railsPost
        })
          .then(res => res.json())
      },

      patch: planner => {
        const body = (({id}) => ({id}))(planner)
        const json = JSON.stringify({planner: {...body, allotted_time: planner.allottedTime}})
        return fetch(`${API_ROOT}/companies/${companyID()}/planners/${planner.id}`, {
          ...railsPatch,
          body: json
        })
          .then(res => res.json())
      }
    },

    pp: {
      post: (procedure_id, planner_id) => { //projectID, plannerID
        const json = JSON.stringify({procedure_id, planner_id})
        return fetch(`${API_ROOT}/companies/${companyID()}/planners_procedures`, {
          ...railsPost,
          body: json
        })
          .then(res => res.json())
      },

      patch: pp => {
        const json = JSON.stringify({allotted_time: pp.allottedTime, planner_id: pp.plannerID, procedure_id: pp.procedureID, id: pp.id})
        return fetch(`${API_ROOT}/companies/${companyID()}/planners_procedures/${pp.id}`, {
          ...railsPatch,
          body: json
        })
          .then(res => res.json())
      },

      destroy: id => { //procedureID, plannerID
        const json = JSON.stringify({id})
        return fetch(`${API_ROOT}/companies/${companyID()}/planners_procedures/${id}`, {
          ...railsDestroy,
          body: json
        })
          .then(res => res.json())
      }
    }
  }
}
