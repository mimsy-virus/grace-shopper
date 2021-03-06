import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ProductsContainer from '../container/ProductContainer'
/**
 * COMPONENT
 */
export const UserHome = props => {
  const { email } = props

  return (
    <div className="ui center aligned container">
      <h3>Welcome, {email}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
