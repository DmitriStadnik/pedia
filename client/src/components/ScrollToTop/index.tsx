import { Button } from '@blueprintjs/core';
import React, { Fragment, useEffect, useState } from 'react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const checkScroll = () => {
    const scrollPos = document.documentElement.scrollTop;

    if (scrollPos > 100) {
      setIsVisible(true);
      return;
    }

    setIsVisible(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScroll);

    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  return isVisible ? (
    <Button
      icon="arrow-up"
      onClick={scrollToTop}
      className="scroll_button"
      type="button"
      minimal
    />
  ) : (
    <Fragment />
  );
};
