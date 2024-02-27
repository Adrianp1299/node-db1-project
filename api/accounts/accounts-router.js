const router = require('express').Router()
const md = require('./accounts-middleware')
const Account = require('./accounts-model')

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Account.getAll()
    res.json(accounts)
  } catch (err) {
    next({ status: 422, message: 'this is horrible'})
  }
})

router.get('/:id', md.chechAccountId, async (req, res, next) => {
  res.json(req.account)
})

router.post('/', 
md.chechAccountPayload, 
md.checkAccountNameUnique, 
async (req, res, next) => {
  try {
    const newAccount = await Account.create(req.body)
    res.status(201).json(newAccount)
  } catch (err) {
    next(err)
  }
  // DO YOUR MAGIC
})

router.put('/:id', 
md.checkAccountId, 
md.chechAccountPayload, 
md.checkAccountNameUnique,
(req, res, next) => {
  try {

  } catch (err) {
    next(err)
  }
  // DO YOUR MAGIC
});

router.delete('/:id', md.checkAccountId, async (req, res, next) => {
  try {
    await Account.deleteById(req.params.id)
    res.json(req.account)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
  })
})

module.exports = router;
