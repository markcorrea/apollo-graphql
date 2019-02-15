import React from 'react'

export default function LaunchItem({ size: { name, basePrice, maxToppings  } }) {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9">
          <h4>Size: { name }</h4>
          <p>Price: { basePrice }</p>
          <p>Max Toppings: { maxToppings }</p>
        </div>
        <div className="col-md-3">
          <button className="btn btn-secondary">Pizza Details</button>
        </div>
      </div>
    </div>
  )
}
