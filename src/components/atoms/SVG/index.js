import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

export const Rect = props => <rect {...props}>{props.children}</rect>;

export const Circle = props => <circle {...props}>{props.children}</circle>;

export const Text = props => <text {...props}>{props.children}</text>;

export const Boundary = props => {
	const groupRef = useRef(undefined);
	const [pathD, setPathD] = useState('');
	const d3line = d3.line()
		.x((d) => {return d.x;})
		.y((d) => {return d.y;})

	useEffect(() => {
		setPathD('');
		const boundary = groupRef.current.getBBox();
		const offset = {
			x: 6,
			y: 4,
		};

		const pathinfo = [
			{x: boundary.x-offset.x, y: boundary.y-offset.y }, 
			{x: boundary.x+offset.x + boundary.width, y: boundary.y-offset.y}, 
			{x: boundary.x+offset.x + boundary.width, y: boundary.y + boundary.height+offset.y }, 
			{x: boundary.x-offset.x, y: boundary.y + boundary.height+offset.y},
			{x: boundary.x-offset.x, y: boundary.y-offset.y },
		];

		setPathD(d3line(pathinfo));
	}, [groupRef, props.children]);

	return (
		<g
			transform={`translate(${props.x},${props.y})`}
			onClick={props.onClick}
			data-id={props['data-id']}
			data-type={props['data-type']}
		>
			<g ref={groupRef}>{props.children}</g>
			{props.selected && <path d={pathD} strokeWidth="1" stroke="rgba(63,81,181,0.5)" fill="transparent" />}
		</g>
	);
};

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
