import React from 'react'
import {
  getCartFromServer,
  addItemToServer,
  updateItemToServer,
  removeItemFromServer,
  clearCartFromServer,
  getCurrentProduct
} from '../../store'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ItemList from './ItemList'
import { setSubtotal } from '../../store/checkout'

class CheckoutCart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: {}
    }
  }
  async componentDidMount() {
    await this.props.getCurrentProduct()
    this.setState({ item: this.props.getCartFromServer(this.props.userId) })
  }

  render() {
    let subtotal = 0
    if (
      this.props.userId &&
      Object.keys(this.props.userCart).length > 0 &&
      this.props.productList.length > 0
    ) {
      const itemList = this.props.userCart
      const productList = this.props.productList
      return (
        <div role="list" className="ui middle aligned list">
          <div className="item">
            {Object.keys(itemList).map(elem => {
              const product = productList.find(
                product => product.id === Number(elem)
              )
              // curPrice = Number(product.price) * Number(this.props.userCart[elem])
              subtotal += Number(product.price) * Number(itemList[elem])
              return (
                <ItemList
                  key={elem}
                  elem={elem}
                  product={product}
                  handleRemove={this.handleRemove.bind(this)}
                  handleUpdate={this.handleUpdate.bind(this)}
                  quantity={itemList[elem]}
                />
              )
            })}
          </div>
          <div className="item">
            <div className="right floated content">
              <button type="button" onClick={this.handleClear.bind(this)}>
                CLEAR CART
              </button>
            </div>
          </div>
          <div className="item">
            <div className="right floated content">
              <h3>SUBTOTAL : ${subtotal}</h3>
            </div>
          </div>
          <div className="item">
            <div className="right floated content">
              <button
                type="button"
                href="/checkout"
                onClick={() => this.updateSubtotal(subtotal)}
              >
                <Link to="/checkout">Click to Checkout</Link>
              </button>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="ui center aligned container">
          <h1>Cart is Empty!</h1>
        </div>
      )
    }
  }

  updateSubtotal = subtotal => {
    this.props.setSubtotal({ userId: [this.props.userId], subtotal })
  }

  async handleRemove(event) {
    event.preventDefault()
    await this.props.removeItemFromServer(this.props.userId, event.target.value)
    this.componentDidMount()
  }
  async handleUpdate(event) {
    event.preventDefault()
    const item = Number(event.target.value)
    await this.props.updateItemToServer(this.props.userId, {
      [event.target.name]: item
    })
    this.componentDidMount()
  }

  async handleClear() {
    event.preventDefault()
    await this.props.clearCartFromServer(this.props.userId)
  }
}

const mapStateToProps = state => ({
  userCart: state.cart.userCart,
  productList: state.products.productList,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  getCartFromServer: userId => dispatch(getCartFromServer(userId)),

  addItemToServer: (userId, item) => dispatch(addItemToServer(userId, item)),

  updateItemToServer: (userId, item) =>
    dispatch(updateItemToServer(userId, item)),

  removeItemFromServer: (userId, itemId) =>
    dispatch(removeItemFromServer(userId, itemId)),

  clearCartFromServer: userId => dispatch(clearCartFromServer(userId)),

  getCurrentProduct: () => dispatch(getCurrentProduct()),

  setSubtotal: subtotal => dispatch(setSubtotal(subtotal))
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutCart)
