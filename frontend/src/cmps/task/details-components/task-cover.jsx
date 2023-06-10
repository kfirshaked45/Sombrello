import React from 'react';

import { useNavigate } from 'react-router-dom';

import { AiOutlineClose } from 'react-icons/ai';
import { MdCallToAction } from 'react-icons/md';
import { utilService } from '../../../services/util.service';

export function TaskCover({ color, coverImg }) {
  
  const navigate = useNavigate();
  // const coverImgBackgroundColor = coverImg ? utilService.getDominantColorFromImage(coverImg) : null;
  // console.log(coverImgBackgroundColor);

  const backgroundColor = color?.coverColor ?? null;

  function onTaskClose(ev) {
    ev.stopPropagation();
    navigate(-1);
  }

  return (
    <div
      className="task-cover"
      style={{
        backgroundColor: backgroundColor,
        height: !backgroundColor && 0,
        backgroundImage: `url(${coverImg})`,
        // Center the background image horizontally and vertically
      }}
    >
      <div className="call-to-action">
        <MdCallToAction className="cta-icon" />
        <span className="cta-text">Cover</span>
      </div>
      <div className="close-task-details-btn" onClick={(ev) => onTaskClose(ev)}>
        <AiOutlineClose />
      </div>
    </div>
  );
}
