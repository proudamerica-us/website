import React from 'react';
import clsx from 'clsx';

export default function HomepageHeader() {
  return (
    <header className={clsx('hero', 'hero--primary', 'heroBanner')}>
      <div className="container">
        <h1 className="hero__title">Welcome to Proud America</h1>
        <p className="hero__subtitle">Uncovering the Truth</p>
      </div>
    </header>
  );
}
