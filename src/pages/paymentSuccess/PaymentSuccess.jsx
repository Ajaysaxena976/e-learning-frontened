import React from 'react'
import "./PaymentSuccess.css"
import { Link, useParams } from 'react-router-dom'
const PaymentSuccess = ({user}) => {
    const params=useParams();
  return (
    <div className="payment-success-page">
        {
            user&& <div className="success-message">
                <h2>Payment Successful</h2>
                <p>Your course subscription has been activated</p>
                <p>Reference number is {params.id}</p>
                <Link className='common-btn' to={`/${user._id}/dashboard`}>Go to dashboard</Link>
            </div>
        }
    </div>
  )
}

export default PaymentSuccess