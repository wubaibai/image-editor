import { hot } from 'react-hot-loader/root';
/**
 * hot-loader should before react and react-dom
 */
import React from 'react';
import ReactDOM from 'react-dom';

const Content = () => <div>Hello</div>;

export default hot(Content);
