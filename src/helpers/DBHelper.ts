/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra')
const jp = require('jsonpath')
const mysql = require('mysql2')

const contents = fs.readFileSync('./allure-report/data/behaviors.json', 'utf8')
const jsonContent = JSON.parse(contents)

const con = mysql.createConnection({
  host: '192.168.12.55',
  port: 3308,
  user: 'qsec',
  password: 'qsec2022',
  database: 'codeceptMetric',
})

con.connect(function (err: any) {
  if (err) {
    console.log(err)
  }
})

const init = `DELETE FROM result_status_details WHERE result_status_details.duration > 0`
con.query(init, function (err: any) {
  if (err) throw err
})

const resultsArray = jp.query(jsonContent, '$..children[*]')

for (let index = 0; index < resultsArray.length; index++) {
  const testName = jp
    .query(jsonContent, '$.children[' + index + '].name')
    .toString()
    .replace(',', '\n')
  const testStatus = jp
    .query(jsonContent, '$.children[' + index + '].status')
    .toString()
    .replace(',', '\n')
  const testDuration = jp
    .query(jsonContent, '$.children[' + index + '].time.duration')
    .toString()
    .replace(',', '\n')

  const sql = `INSERT INTO result_status_details (name, status, duration) VALUES ('${testName}','${testStatus}','${testDuration}')`
  con.query(sql, (err: any) => {
    if (err) throw err
  })
}
console.log('Data successfully inserted to database')
con.end()
