const axios = require('axios')
const {Companies,Employees} = require('../models')

class apiController {
    //no1
  static async fibo(req, res) {
    try {
        const {n} = req.body
      let a = 0;
      let b = 1;
      let temp = 0;
      let result = 0;
      for (let i = 0; i < n; i++) {
        if (i === 0) {
          result = result+i+' '
        } else if (i === n - 1) {
          temp = a + b;
          result = result+temp
        } else if (i === 1) {
            temp = i + a;
            result = result+temp+' '
        } else {
          temp = a + b;
          a = b;
          b = temp;
          result = result+temp+' '
        }
      }
      console.log(result);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  //no2
  static async combination(req, res) {
    try {
        const {n,r} = req.body
        let nr =n-r
        let nf=1
        let rf=1
        let nrf=1
        for(let i=n;i>0;i--){
            nf = nf*i
        }
        for(let i=r;i>0;i--){
            rf = rf*i
        }
        for(let i=nr;i>0;i--){
            nrf = nrf*i
        }

        let c = nf/(rf*nrf)
        res.status(200).json(c)

    } catch (err) {
      res.status(400).json(err);
    }
  }

  //no3
  static async addComp(req, res) {
      try{
          const {company_name,telephone_number,address}=req.body

          const data = await Companies.create({
              company_name,telephone_number,address
          })
          res.json({status:201,data,message:"success"})
      }catch (err) {
          res.status(500).json(err)
      }
  }

  static async showComp(req, res) {
    try{
        let data = await Companies.findAll()
        res.json({status:200,data,message:"success"})
    }catch (err) {
        res.status(500).json(err)
    }
}

static async active(req, res) {
    try{
        const id = +req.params.id
        await Companies.update({
            is_active : true
        },{where:{id}})
        let data = await Companies.findOne({
            attributes:['id','is_active'],
            where:{id}
        })
        res.json({status:200,data,message:"success"})
    }catch (err) {
        res.status(500).json(err)
    }
}

static async empByCompId(req, res) {
    try{
        const id = +req.params.id
        console.log(id)
        let data = await Companies.findOne({
            include:[Employees],
            where:{id}
        })
        res.json({status:200,data,message:"success"})
    }catch (err) {
        res.status(500).json(err)
    }
}

static async empById(req, res) {
    try{
        const id = +req.params.id
        let data = await Employees.findByPk(id)
        if(data){
            res.json({status:200,data,message:"success"})
        }else{
            res.json({status:404,data,message:"id not found"})
        }
    }catch (err) {
        res.status(500).json(err)
    }
}

static async addEmp(req, res) {
    try{
        const {name,email,phone_number,jobtittle} = req.body
        const company_id = +req.params.company_id
        let data = await Employees.create({
            name,email,phone_number,jobtittle,companyId:company_id
        })
        res.json({status:201,data,message:"success"})
    }catch (err) {
        res.status(500).json(err)
    }
}

static async editEmp(req, res) {
    try{
        const company_id = +req.params.company_id
        const employee_id = +req.params.employee_id
        await Employees.update({
            companyId:company_id
        },{where:{id:employee_id}})

        let data = await Employees.findOne({
            attributes:['id','companyId'],
            where:{id:employee_id}
        })
        res.json({status:201,data,message:"success"})
    }catch (err) {
        res.status(500).json(err)
    }
}

static async delEmp(req, res) {
    try{
        const id = +req.params.id
        let data = await Employees.destroy({
            where:{id}
        })
        res.json({status:204,data,message:"success"})
    }catch (err) {
        res.status(500).json(err)
    }
}
  //no4
  static async country(req, res) {
      try{
        const url = 'http://api.countrylayer.com/v2/all'
        const result = await axios({
            method:'GET',
            url,
            params:{access_key : '5183bd8726e1bd411ecad4b9e92c1d63'}
        })

        let data=[]
        result.data.map(rslt=>{
            let{name,region}=rslt
            return data.push({name,region})
        })

        res.status(200).json(data)
      }catch (err) {
          res.status(500).json(err);
      }
  }



}

module.exports = apiController;
