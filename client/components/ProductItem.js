import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class ProductItem extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    // console.log(this.props.product)
    const product = this.props.product
    const { name, description, imgUrl, price, category } = product
    const productId = product.id
    let quantity = 1

    function handleChange(event) {
      quantity = event.target.value
    }

    return (
      <div>
        <div role="listitem" className="item">
          <div className="content">
            <Link to={`/products/${this.props.product.id}`}>
              <div role="list" className="ui horizontal relaxed list">
                <div role="listitem" className="item">
                  <img src={imgUrl} className="ui small middle aligned image" />
                </div>
                <div role="listitem" className="item">
                  {name}
                  <div className="description">{description}</div>
                </div>
                <div role="listitem" className="item">
                  <p>category: {category}</p>
                </div>
                <div role="listitem" className="item">
                  <h2>${price}</h2>
                </div>
              </div>
            </Link>
            <div role="list" className="ui middle aligned list">
              <div role="listitem" className="item">
                <div>
                  <form>
                    <label>Quantity:</label>
                    <input
                      type="number"
                      onChange={handleChange}
                      placeholder={1}
                    />
                  </form>
                  <button
                    className="ui button"
                    role="button"
                    type="button"
                    value={name}
                    onClick={() =>
                      this.props.isLoggedIn
                        ? this.props.onClick({ [productId]: quantity })
                        : this.props.history.push('/login')
                    }
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ProductItem)
