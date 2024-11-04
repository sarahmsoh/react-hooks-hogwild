import React from 'react'

function HogDetails({ hog }) {
  const { greased, weight, "highest medal achieved": medal } = hog
  return (
    <div className="description">
      <strong>{greased ? 'Greased' : 'Nongreased'}</strong>
      <p>
        Highest medal achived: <strong>{medal}</strong>
      </p>
      <p>
        Weight : <strong>{weight}</strong>
      </p>
    </div>
  )
}

export default HogDetails