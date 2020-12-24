import React, { useRef } from 'react';
import { connect } from 'react-redux';

import { addImage } from 'actions/image';
import Button from 'components/atoms/Button';
import style from './index.css';

const Header = ({ addImageAction }) => {
	const fileInputRef = useRef();

	const readFile = input => {
		if (input.files && input.files[0]) {
			const reader = new FileReader();
			reader.onload = e => {
				const img = new Image();
				img.src = e.target.result;
				img.onload = () => {
					addImageAction({
						data: img,
						width: img.width,
						height: img.height,
					});
				};
			};
			reader.readAsDataURL(input.files[0]);
		}
	};

	const onImportClick = () => {
		fileInputRef.current.click();
	};

	const onFileInputChanged = e => {
		readFile(e.target);
	};

	return (
		<div className={style.header}>
			<div>Image Editor</div>
			<div className={style.actions}>
				<Button onClick={onImportClick}>Import</Button>
				<input type="file" hidden ref={fileInputRef} onChange={onFileInputChanged} />
				<Button>Export</Button>
			</div>
		</div>
	);
};

export default connect(null, {
	addImageAction: addImage,
})(Header);
