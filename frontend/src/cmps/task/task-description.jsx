import React from "react"
import { TfiAlignLeft } from "react-icons/tfi"

export function TaskDescription({description}){
  return (
    <div className="description">
      <div className="description-title">
        <TfiAlignLeft className="icon-description" />
        <h2>Description</h2>
      </div>
      <div>
        <textarea
          placeholder="Add a more detailed description.."
          className="main-content-text-area"
        ></textarea>
      </div>
    </div>
  )
}