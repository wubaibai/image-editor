import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import style from './index.css';

const Editor = ({ image }) => {
	const editorRef = useRef();

	useEffect(() => {
		console.log('image changed');
		console.log(image);

		if (editorRef.current && image.data) {
			editorRef.current.appendChild(image.data);
		}
	}, [image]);

	return (
		<div className={style.editor} ref={editorRef}>
			Editor
		</div>
	);
};

const mapStateToProps = state => ({
	image: state.image,
});

export default connect(mapStateToProps, {})(Editor);
