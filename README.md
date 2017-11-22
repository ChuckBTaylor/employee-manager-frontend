File Structure:
* public
  * index.html
  * manifest.json
* src
    actions-----|
                -employee.js
                -schedule.js
    |
    components--|
                employeeStuff-|
                              -EmployeeList.js
                |
                scheduleStuff-|
                              -Calendar.js
                              -NewScheduleForm.js
                              -ScheduleModal.js
                |
                NavBar.js
    |
    containers--|
                -EmployeeContainer.js
                -ScheduleContainer.js
    |           
    helpers-----|
                -apiRequests.js
                -generalHelpers.js
                -momentHelper.js
    |            
    reducers----|
                -employeeReducers.js
                -scheduleReducer.js
    |
    -App.css
    -App.js
    -index.css
    -index.js
    -registerServiceWorker.js
|
-package.json
-README.md
-yarn.lock


(View this in raw format to see awesome formatting)

