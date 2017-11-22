File Structure:
* public
  * -index.html
  * -manifest.json
* src
  * actions
    * -employee.js
    * -schedule.js
  * components
    * employeeStuff
      * -EmployeeList.js
    * scheduleStuff
      * -Calendar.js
      * -NewScheduleForm.js
      * -ScheduleModal.js
    * -NavBar.js
  * containers
    * -EmployeeContainer.js
    * -ScheduleContainer.js          
  * helpers
    * -apiRequests.js
    * -generalHelpers.js
    * -momentHelper.js          
  * reducers
    * -employeeReducers.js
    * -scheduleReducer.js
 * -App.css
 * -App.js
 * -index.css
 * -index.js
 * -registerServiceWorker.js
* -package.json
* -README.md
* -yarn.lock


App.js containers main router to all containers.  If it's in App and doesn't have a Route, it probably shouldn't be there. Everything else will come from a container.

All reducers will take in objects produced by the files in actions. In /actions the files are named the singular noun and in /reducers they're the same +'Reducer'

In /helpers any function that doesn't really fit anywhere else.  Try to keep them organized by what they do.



[Backend Repo](https://github.com/ChuckBTaylor/employee-manager-backend)
