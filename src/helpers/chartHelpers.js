export function formatProjectDataForChart(totalBid, totalWorked, workedThisWeek){
  return [
    {
      name: "Time remaining on bid",
      time: totalBid - totalWorked
    },
    {
      name: "Time worked on other weeks",
      time: totalWorked - workedThisWeek
    },
    {
      name: "Time worked this week",
      time: workedThisWeek
    }
  ]
}
