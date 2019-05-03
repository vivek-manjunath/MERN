import React from 'react'

export default function TextInput(props) {
  return (
    <div>
      <input type="text" className="form-control" {...props} />
    </div>
  )
}
