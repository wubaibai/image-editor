import React, { useRef, useState } from 'react';
import { saveAs } from 'file-saver';

import { addImage } from 'actions/image';
import Button from 'components/atoms/Button';
import Modal from 'components/molecules/Modal';
import style from './index.css';
import useRedux from 'utils/hooks/useRedux';

const Header = () => {
	const fileInputRef = useRef();
	const [isExportModal, setIsExportModal] = useState(false);

	/**
	 * get data from store and bindActionCreators
	 */
	const mapHooksToState = state => ({
		image: state.image,
	});
	const [{ image }, { addImage: addImageAction }] = useRedux(mapHooksToState, { addImage });

	/**
	 * set component state
	 */
	const [mimeType, setMimeType] = useState('image/jpeg');
	const [quality, setQuality] = useState(1);

	const readFile = input => {
		if (input.files && input.files[0]) {
			const reader = new FileReader();
			reader.onload = e => {
				const img = new Image();
				img.onload = () => {
					addImageAction({
						data: img,
						width: img.width,
						height: img.height,
					});
				};
				img.src = e.target.result;
			};
			reader.readAsDataURL(input.files[0]);
		}
	};

	const onImportClick = () => {
		fileInputRef.current.click();
	};

	const getMarkersContent = () => {
		return new Promise((resolve, reject) => {
			const markersSvg = document.getElementById('markers');
			const cloneElement = markersSvg.cloneNode(true);
			const { outerHTML } = cloneElement;
			const blob = new Blob([outerHTML], { type: 'image/svg+xml;charset=utf-8' });
			const URL = window.URL || window.webkitURL || window;
			const blobURL = URL.createObjectURL(blob);

			const markersContent = new Image();
			markersContent.onload = () => {
				resolve(markersContent);
			};
			markersContent.onerror = error => {
				reject(error);
			};
			markersContent.src = blobURL;
		});
	};

	const onExportConfirm = async () => {
		const exportCanvas = document.createElement('CANVAS');
		const exportCtx = exportCanvas.getContext('2d');
		exportCanvas.width = image.width;
		exportCanvas.height = image.height;
		exportCtx.drawImage(image.data, 0, 0);

		try {
			const markersContent = await getMarkersContent();
			exportCtx.drawImage(markersContent, 0, 0, image.width, image.height);

			exportCanvas.toBlob(
				blob => {
					saveAs(blob, 'exported');
				},
				mimeType,
				quality,
			);
		} catch (error) {
			console.log(error);
		}
	};

	const onExportClick = async () => {
		setIsExportModal(true);
	};

	const onFileInputChanged = e => {
		readFile(e.target);
	};

	const renderExportModal = () => {
		const content = (
			<div>
				MIME Type: {mimeType}, Quality: {quality}
			</div>
		);
		const actions = <Button onClick={onExportConfirm}>Export</Button>;

		return (
			<Modal
				title="匯出圖片"
				content={content}
				actions={actions}
				visible={isExportModal}
				onDismiss={() => setIsExportModal(false)}
			/>
		);
	};

	return (
		<div className={style.header}>
			<div>Image Editor</div>
			<div className={style.actions}>
				<Button onClick={onImportClick}>Import</Button>
				<input type="file" hidden ref={fileInputRef} onChange={onFileInputChanged} />
				<Button onClick={onExportClick}>Export</Button>
				{renderExportModal()}
			</div>
		</div>
	);
};

export default Header;
