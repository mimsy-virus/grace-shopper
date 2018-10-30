const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  imgUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue:
      'https://i0.wp.com/www.skepticalraptor.com/blog/wp-content/uploads/2017/02/vaccine-vial-syringe-white.jpg?fit=768%2C576&ssl=1',
    validate: {
      isUrl: true
    }
  },

  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0
    }
  },

  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0
    }
  },

  categories: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [['pills', 'shots']]
    }
  }
})

module.exports = Product