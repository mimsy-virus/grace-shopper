const router = require('express').Router()
const { Product } = require('../db/models')
module.exports = router

const ifIsAdimin = (req, res, next) => {
  //console.log('!!!!!' + req.session)
  if (req.user.isAdmin) {
    next()
  } else {
    res.status(401).send('Access Denied!')
  }
}
router.get('/', ifIsAdimin, async (req, res, next) => {
  try {
    const products = await Product.findAll({})
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', ifIsAdimin, async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).send('Not found')
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.get('/category/:category', ifIsAdimin, async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: { category: req.params.category }
    })
    if (!products) return res.status(404).send('Not found')
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/', ifIsAdimin, async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', ifIsAdimin, async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    await product.update(req.body)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', ifIsAdimin, async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    await product.destroy()
    res.json(product)
  } catch (err) {
    next(err)
  }
})
