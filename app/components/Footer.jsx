import React from 'react';
import { VERSION } from '../constants';

export default function Footer() {
  return (
    <footer>
      Kolinahr {VERSION}
      <a href="https://www.github.com/joeattardi/kolinahr">
        <i style={{ margin: '0 1em' }} className="fa fa-github" />
      </a>
    </footer>
  );
}
