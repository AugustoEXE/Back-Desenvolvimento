const express = require('express')

const router = express.Router()

const publishCompanyController = require('../controllers/publishCompanyController')
const { auth } = require('../middlewares/auth')

router.get('/publish-companies',async (req,res)=>{
    const publish_companies = await publishCompanyController.getAll()
    res.json(publish_companies)
})

router.post('/publish-company',auth, async (req,res)=>{
    await publishCompanyController.create(req.body)
    res.send('OK')
})

router.put('/publish-company/:id', async (req,res)=>{
    const {name} = req.body
    const {id} = req.params
    await publishCompanyController.update(Number(id),name)
    res.send('OK')
})

router.delete('/publish-company/:id', async (req,res)=> {
    const { id } = req.params
    await publishCompanyController.delete(Number(id))
    res.send('OK')
})



module.exports =  router