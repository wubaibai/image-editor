import React from 'react';
import { hot } from 'react-hot-loader/root';

import Header from 'components/organisms/Header';
import Tools from 'components/organisms/Tools';
import Editor from 'components/organisms/Editor';
import Information from 'components/organisms/Information';
import style from './index.css';

const App = () => {
	return (
		<div className={style.app}>
			<div className={style.header}>
				<Header />
			</div>
			<div className={style.container}>
				<div className={style.aside}>
					<Tools />
				</div>
				<div className={style.main}>
					<div className={style.editor}>
						<Editor />
					</div>
					<div className={style.information}>
						<Information />
					</div>
				</div>
			</div>
		</div>
	);
};

export default hot(App);
