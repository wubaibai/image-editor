import React from 'react';
import { connect } from 'react-redux';

import Canvas from 'components/atoms/Canvas';
import style from './index.css';

const Editor = ({ image }) => {
	return (
		<div className={style.editor}>
			{image.data ? (
				<div className={style.canvas}>
					<Canvas image={image} />
				</div>
			) : (
				<div>Please import image</div>
			)}
		</div>
	);
};

const mapStateToProps = state => ({
	image: state.image,
});

export default connect(mapStateToProps, {})(Editor);
