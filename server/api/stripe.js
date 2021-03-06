const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { Order } = require('../db/models')
module.exports = router

// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys

router.post('/:id', async (req, res, next) => {
  try {
    let order = await Order.findOne({
      where: {
        userId: req.params.id,
        status: 'created'
      }
    })
    if (!order) return res.status(404).send('Not found')

    let { status } = await stripe.charges.create({
      amount: `${order.total * 100}`,
      currency: 'usd',
      description: 'An example charge',
      source: req.body.id
    })
    if (status === 'succeeded') {
      await order.update({
        status: 'completed'
      })
    }
    res.json({ status })
  } catch (err) {
    next(err)
  }
})
