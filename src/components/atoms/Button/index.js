import React from 'react';

import style from './index.css';

const Button = ({ children, onClick }) => {
	return (
		<button className={style.button} type="button" onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
