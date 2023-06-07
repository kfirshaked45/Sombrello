import React from 'react';
import { TfiAlignLeft } from 'react-icons/tfi';

export function TaskDescription({ description }) {
  return (
    <div className="description">
      <div className="description-title-container details-grid ">
        <TfiAlignLeft className="icon-description" />
        <h3 className="description-title">Description</h3>
      </div>
      <div>
        <textarea placeholder="Add a more detailed description.." className="main-content-text-area"></textarea>
      </div>
    </div>
  );
}
