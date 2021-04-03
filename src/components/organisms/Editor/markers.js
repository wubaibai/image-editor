import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import SVG, { Rect } from 'components/atoms/SVG';
import { SHAPES } from 'utils/const';
import { addMarker, updateMarker } from 'actions/markers';
import useRedux from 'utils/hooks/useRedux';
import style from './index.css';

const getCoordinates = (element, event) => {
	if (!element) {
		return undefined;
	}

	const markersPosition = element.getBoundingClientRect();

	return {
		x: event.pageX - markersPosition.left,
		y: event.pageY - markersPosition.top,
	};
};

const renderMarkers = (markers) => {
	if (_.isEmpty(markers.list)) {
		return null
	}

	return markers.list.map((id) => {
		const mark = markers.data[id];

		if (mark.type === SHAPES.RECTANGLE) {
			return (
				<Rect
					height={mark.position.end.y - mark.position.start.y}
					width={mark.position.end.x - mark.position.start.x}
					x={mark.position.start.x}
					y={mark.position.start.y}
					fill={mark.style.fill}
					stroke={mark.style.stroke}
					stroke-width={mark.style.strokeWidth}
				/>
			);
		}

		return null;
	});
};

const Markers = () => {
	const mapHooksToState = state => ({
		markers: state.markers,
		editor: state.editor,
		tools: state.tools,
	});
	const [
		{ tools, markers, editor },
		{ addMarker: addMarkerAction, updateMarker: updateMarkerAction },
	] = useRedux(mapHooksToState, { addMarker, updateMarker });
	const isPainting = useRef(false);
	const markerId = useRef(undefined);
	const markersRef = useRef();
	const markersType = useMemo(() => tools.settings[tools.selected].selected);

	const startPaint = useCallback(event => {
		console.log('startPaint');
		isPainting.current = true;

		markerId.current = new Date().getTime();
		const coordinates = getCoordinates(markersRef.current, event);
		if (coordinates) {
			addMarkerAction({
				id: markerId.current,
				type: markersType,
				coordinates,
				style: tools.attributes,
			});
		}
	}, []);

	const paint = useCallback(event => {
		if (!isPainting.current) {
			return;
		}

		const coordinates = getCoordinates(markersRef.current, event);
		if (!coordinates) {
			return;
		}

		console.log('paint');
		updateMarkerAction({
			id: markerId.current,
			data: {
				position: {
					end: {
						x: coordinates.x,
						y: coordinates.y,
					},
				},
			},
		});
	}, []);

	const exitPaint = useCallback(event => {
		console.log('exitPaint');

		const coordinates = getCoordinates(markersRef.current, event);
		if (!coordinates) {
			return;
		}

		isPainting.current = false;
		if (!markerId.current) {
			return;
		}
	}, []);

	useEffect(() => {
		if (!markersRef.current) {
			return;
		}

		const throttledPaint = _.throttle(paint, 100);
		markersRef.current.addEventListener('mousedown', startPaint);
		markersRef.current.addEventListener('mousemove', throttledPaint);
		markersRef.current.addEventListener('mouseup', exitPaint);
		markersRef.current.addEventListener('mouseleave', exitPaint);
		return () => {
			markersRef.current.removeEventListener('mousedown', startPaint);
			markersRef.current.removeEventListener('mousemove', throttledPaint);
			markersRef.current.removeEventListener('mouseup', exitPaint);
			markersRef.current.removeEventListener('mouseleave', exitPaint);
		};
	}, []);

	return (
		<div className={style.markers}>
			<SVG
				id="markers"
				width={editor.width}
				height={editor.height}
				ref={markersRef}
			>
				{renderMarkers(markers)}
			</SVG>
		</div>
	);
};

export default Markers;
