import React from 'react';
import { render } from 'react-dom';
import AppContainer from './containers/AppContainer';

render(
  <AppContainer />,
  document.getElementById('app'),
);

window.onresize = (e) => {
  console.log(window.screen);
}