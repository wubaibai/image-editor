import React from 'react';
import { connect } from 'react-redux';

import Canvas from 'components/atoms/Canvas';
import style from './index.css';

const Editor = ({ image, editor }) => {
	return (
		<div className={style.editor}>
			{image.data ? (
				<div className={style['canvas-wrap']}>
					<div className={style.markers}>
						<svg
							id="markers"
							width={editor.width}
							height={editor.height}
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect
								width="50"
								height="50"
								style={{
									fill: 'none',
									strokeWidth: 2,
									stroke: 'rgb(255, 0, 0)',
								}}
							/>
						</svg>
					</div>
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
	editor: state.editor,
});

export default connect(mapStateToProps, {})(Editor);
