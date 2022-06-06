// Your code here
function createEmployeeRecord(input) {
  return {
    firstName: input[0],
    familyName: input[1],
    title:  input[2],
    payPerHour: input[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(employees) {
  let record = []
  employees.map(name => record.push(createEmployeeRecord(name)))
  return record
}

function createTimeInEvent(employee, time) {
  let data = time.split(' ')
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(data[1]),
    date: data[0]
  })
  return employee
}

function createTimeOutEvent(employee, time) {
  let data = time.split(' ')
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(data[1]),
    date: data[0]
  })
  return employee
}

function hoursWorkedOnDate(employee, date) {
  let start = employee.timeInEvents.filter(e => e.type === 'TimeIn')
  let startDate = start.find(e => e.date === date)
  let finish = employee.timeOutEvents.filter(e => e.type === 'TimeOut')
  let finishDate = finish.find(e => e.date === date)
  
  return (finishDate.hour - startDate.hour)/100
}

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date)*employee.payPerHour
}

function allWagesFor(employee) {
  let wages = employee.timeOutEvents.filter(e => e.type === 'TimeOut')

  let salary = wages.map((wage) => wagesEarnedOnDate(employee, wage.date))

  const totalSalary = salary.reduce(
    (previousValue, currentValue) => previousValue + currentValue
  );
  return totalSalary
}

function calculatePayroll(employees) {
  let allWages = employees.map((employee) => allWagesFor(employee))
  let payroll = allWages.reduce(
    (previousValue, currentValue) => previousValue + currentValue
  );
  return payroll
}

