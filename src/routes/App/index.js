import React from 'react';
import { hot } from 'react-hot-loader/root';
/**
 * hot-loader should before react and react-dom
 */
import Content from 'components/organisms/Content';

const App = () => {
	return (
		<>
			<Content />
		</>
	);
};

export default hot(App);
