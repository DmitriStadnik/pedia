import React, { Fragment, useState } from 'react';
import { 
  Drawer, 
  H3, 
  H5, 
  Position, 
  Button, 
  // DrawerSize, 
  Icon, 
  IconSize 
} from "@blueprintjs/core";
import mainPage from "./mainPageData";

import "./Article.css";

export const Article: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const drawerProps = {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    hasBackdrop: true,
    position: Position.LEFT,
    usePortal: true,
  }

  return (
    <Fragment>
      <Drawer
        className='drawer'
        isOpen={drawerOpen}
        onClose={handleDrawerToggle}
        {...drawerProps}
      >
        <div className='drawer__header'>
          <Button 
            className='drawer__button button button_nobg'
            onClick={handleDrawerToggle}
            icon={<Icon icon='cross' size={IconSize.LARGE} intent='primary' />}
            minimal
          />
          <H3 className='drawer__title'>Говнолор</H3>
        </div>
      </Drawer>
      <div className='wrapper'>
        <div className='header'>
          <Button 
            className='header__button button button_nobg'
            onClick={handleDrawerToggle}
            icon={<Icon icon='menu' size={IconSize.LARGE} intent='primary' />}
            minimal
          />
          <H3 className='header__text'>{mainPage.title}</H3>
        </div>
        <div className='article'>
          <H5 className='article__header'>
            Название сегмента
          </H5>
          <p className='article__text'>
            {mainPage.content}
          </p>
          <H5 className='article__header'>
            Название сегмента
          </H5>
          <p className='article__text'>
            {mainPage.content}
          </p>
        </div>
      </div>
    </Fragment>
  );
};
