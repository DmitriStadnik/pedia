import React from 'react';
import './Footer.css';

export const Footer: React.FC<{ title: string }> = ({ title }) => (
  <footer className="footer">
    <div className="footer__text">
      <p className="footer__header">{title}</p>
      <p className="footer__subheader">powered by PEDIA</p>
    </div>
  </footer>
);
