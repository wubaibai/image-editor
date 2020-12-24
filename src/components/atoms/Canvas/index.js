import React, { useEffect, useRef } from 'react';

const Canvas = ({ image, maxW = 960, maxH = 480 }) => {
	const canvasRef = useRef();
	const contextRef = useRef();

	const resize = source => {
		/**
		 * only resize some side bigger then max value
		 */
		if (source.width > maxW || source.height > maxH) {
			if (source.width / source.height >= 2) {
				return [maxW, (source.height * maxW) / source.width];
			}

			return [(source.width * maxH) / source.height, maxH];
		}

		return [source.width, source.height];
	};

	useEffect(() => {
		contextRef.current = canvasRef.current.getContext('2d');
	}, []);

	useEffect(() => {
		contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

		if (image.data) {
			const [newW, newH] = resize(image);
			canvasRef.current.width = newW;
			canvasRef.current.height = newH;
			contextRef.current.drawImage(image.data, 0, 0, newW, newH);
		}
	}, [image]);

	return <canvas ref={canvasRef} />;
};

export default Canvas;
