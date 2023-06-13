import React, { Fragment, useState } from 'react';
import { SideMenuBackgroundOptions } from './side-menu-background-options';
import { SideMenuColors } from './side-menu-colors';
import { SideMenuPhotos } from './side-menu-photos';
import { SideMenuMainDisplay } from './side-menu-main-display';
import { IoIosArrowBack } from 'react-icons/io';
import { ActivityDetails, Activitys } from '../../activity-details';

export const BoardSideMenu = ({ isOpen, onCloseSideMenu, changeBackground, board }) => {
  const [title, setTitle] = useState('Menu');

  const onChangeTitle = (title) => {
    setTitle(title);
  };

  const getCmp = () => {
    switch (title) {
      case 'Menu':
        return <SideMenuMainDisplay onChangeTitle={onChangeTitle} />;
      case 'Change background':
        return <SideMenuBackgroundOptions onChangeTitle={onChangeTitle} />;
      case 'Colors':
        return <SideMenuColors changeBackground={changeBackground} />;
      case 'Photos by':
        return <SideMenuPhotos changeBackground={changeBackground} />;

      default:
        return <section></section>;
    }
  };

  const onGoBack = () => {
    switch (title) {
      case 'Change background':
        setTitle('Menu');
        break;
      case 'Colors':
      case 'Photos by':
        setTitle('Change background');
        break;

      default:
        return <section></section>;
    }
  };

  return (
    <section className={`board-side-menu ${isOpen} `}>
      <section className="header">
        {title !== 'Menu' && <IoIosArrowBack className="go-back" onClick={onGoBack} />}
        <h3>
          {title === 'Photos by' ? (
            <Fragment>
              {title} Unsplash
            </Fragment>
          ) : (
            title
          )}
        </h3>
        <section className="svg-holder" onClick={onCloseSideMenu}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" stroke="#000" strokeWidth="2" d="M3,3 L21,21 M3,21 L21,3"></path>
          </svg>
        </section>
      </section>
      <div className="side-menu-scroller u-fancy-scrollbar">
        <section className="divider-side"></section>
        {getCmp()}
        <ActivityDetails board={board} />
      </div>
    </section>
  )  
};
