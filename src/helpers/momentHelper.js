export function formatMoment(date){
  const moment = require('moment')
  return moment(date).format()
}

export function addToMoment(date, amount, type){
  const moment = require('moment')
  return moment(date).add(amount, type).format()
}

export function formatForPlanner(date){
  const moment = require('moment')
  return moment(date).format("YYYYMMDD")
}
