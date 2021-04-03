import React from 'react';

export const Rect = props => <rect {...props}>{props.children}</rect>;

export const Circle = props => <circle {...props}>{props.children}</circle>;

const SVG = React.forwardRef((props, ref) => {
	const { minX = 0, minY = 0, width, height } = props;

	return (
		<svg
			{...props}
			ref={ref}
			viewBox={`${minX} ${minY} ${width} ${height}`}
			xmlns="http://www.w3.org/2000/svg"
		>
			{props.children}
		</svg>
	);
});

export default SVG;
