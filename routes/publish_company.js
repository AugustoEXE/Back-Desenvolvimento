const express = require('express')

const router = express.Router()

const publish_companyController = require('../controllers/publish_companyController')

router.get('/publish_companies',async (req,res)=>{
    const publish_companys = await publish_companyController.getAll()
    res.json(publish_companys)
})

router.post('/publish_company', async (req,res)=>{
    const {data} = req.body
    await publish_companyController.create(data)
    res.send('OK')
})

router.put('/publish_company/:id', async (req,res)=>{
    const {name} = req.body
    const {id} = req.params
    await publish_companyController.update(Number(id),name)
    res.send('OK')
})

router.delete('/publish_company/:id', async (req,res)=> {
    const { id } = req.params
    await publish_companyController.delete(Number(id))
    res.send('OK')
})



module.exports =  router