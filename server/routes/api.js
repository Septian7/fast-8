const apiRoute = require('express').Router()
const apiController = require('../controllers/apiController')

//no 1
apiRoute.post('/fibonacci',apiController.fibo)
//no 2
apiRoute.post('/combination',apiController.combination)
//no3
apiRoute.post('/companies',apiController.addComp)
apiRoute.get('/companies',apiController.showComp)
apiRoute.put('/companies/:id/set_active',apiController.active)
apiRoute.get('/companies/:id/employees',apiController.empByCompId)
apiRoute.get('/employees/:id',apiController.empById)
apiRoute.post('/companies/:company_id/employees',apiController.addEmp)
apiRoute.put('/companies/:company_id/employees/:employee_id',apiController.editEmp)
apiRoute.delete('/employees/:id',apiController.delEmp)
//no4
apiRoute.get('/countries',apiController.country)

module.exports = apiRoute