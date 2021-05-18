import React, { useRef, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import SVG, { Rect, Text, Boundary } from 'components/atoms/SVG';
import { MARKERS, TOOLS } from 'utils/const';
import { addMarker, updateMarker, setSelectedMarker, setDragStart } from 'actions/markers';
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

const renderMarkers = (markers, toolsType) => {
	if (_.isEmpty(markers.list)) {
		return null;
	}

	const selectedId = markers.selected;
	return markers.list.map((id) => {
		const mark = markers.data[id];

		if (mark.type === MARKERS.RECTANGLE) {
			return (
				<Rect
					className={toolsType === TOOLS.MOVE && style.dragable}
					key={id}
					selected={id === selectedId}
					height={mark.position.end.y - mark.position.start.y}
					width={mark.position.end.x - mark.position.start.x}
					x={mark.position.start.x}
					y={mark.position.start.y}
					fill={mark.style.fill}
					stroke={mark.style.stroke}
					strokeWidth={mark.style.strokeWidth}
					data-id={id}
					data-type={MARKERS.RECTANGLE}
				/>
			);
		} else if (mark.type === MARKERS.TEXT) {
			return (
				<Boundary
					className={toolsType === TOOLS.MOVE && style.dragable}
					key={id}
					selected={id === selectedId}
					x={mark.position.start.x}
					y={mark.position.start.y}
					data-id={id}
					data-type={MARKERS.TEXT}
					fill={mark.style.fill}
				>
					<Text 
						fill={mark.style.fillText}
					>
						Sample Text
					</Text>
				</Boundary>
			);
		}

		return null;
	});
};

const Markers = () => {
	const mapHooksToState = state => ({
		markers: state.markers,
		editor: state.editor,
	});
	const [
		{ markers, editor },
		{ addMarker: addMarkerAction, updateMarker: updateMarkerAction, setSelectedMarker: setSelectedMarkerAction, setDragStart: setDragStartAction },
	] = useRedux(mapHooksToState, { addMarker, updateMarker, setSelectedMarker, setDragStart });
	const isMouseDown = useRef(false);
	const markerId = useRef(undefined);
	const markersRef = useRef();
	const toolsType = useSelector(state => state.tools.selected);
	const toolsAttributes = useSelector(state => state.tools.attributes);
	const markersType = useSelector(state => state.tools.settings[state.tools.selected].selected);
	const paintingTypes = ['shape'];
	const clickTypes = ['text'];
	const dragTypes = ['move'];

	const mouseDown = useCallback(event => {
		if (!_.includes(paintingTypes, toolsType) && !_.includes(dragTypes, toolsType)) {
			return;
		}

		console.log('mouseDown');
		isMouseDown.current = true;
		markerId.current = new Date().getTime();
		const coordinates = getCoordinates(markersRef.current, event);
		if (coordinates) {
			if (toolsType === TOOLS.MOVE) {
				const markerNode = event.target.closest('[data-id]');
				if (markerNode) {
					const id = markerNode.getAttribute('data-id');
					setSelectedMarkerAction({ id: _.toNumber(id) });
					markerId.current = _.toNumber(id);

					setDragStartAction(coordinates);
				} else {
					setSelectedMarkerAction({ id: null });
				}

				return;
			}
			
			addMarkerAction({
				id: markerId.current,
				type: markersType,
				coordinates,
				style: toolsAttributes,
			});
		}
	}, [toolsType, markersType, toolsAttributes]);

	const mouseMove = useCallback(event => {
		if (!isMouseDown.current || (!_.includes(paintingTypes, toolsType) && !_.includes(dragTypes, toolsType))) {
			return;
		}

		const coordinates = getCoordinates(markersRef.current, event);
		if (!coordinates) {
			return;
		}

		if (toolsType === TOOLS.MOVE) {
			const markerNode = event.target.closest('[data-id]');
			if (markerNode) {
				const id = markerNode.getAttribute('data-id');
				const obj = markers.data[id];
				const { x: xDragStart, y: yDragStart } = markers.dragStart;
				const { x: xDragEnd, y: yDragEnd } = coordinates;
				const xDelta = xDragEnd - xDragStart;
				const yDelta = yDragEnd - yDragStart;
				updateMarkerAction({
					id: markerId.current,
					data: {
						position: {
							start: {
								x: obj.position.start.x + xDelta,
								y: obj.position.start.y + yDelta,
							},
							end: {
								x: obj.position.end.x + xDelta,
								y: obj.position.end.y + yDelta,
							}
						},
					},
				});

				setDragStartAction({
					x: xDragEnd,
					y: yDragEnd,
				});
			}

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
	}, [toolsType, markersType, markers]);

	const mouseUpAndLeave = useCallback(event => {
		if (!_.includes(paintingTypes, toolsType) && !_.includes(dragTypes, toolsType)) {
			return;
		}

		console.log('mouseUpAndLeave');

		const coordinates = getCoordinates(markersRef.current, event);
		if (!coordinates) {
			return;
		}

		isMouseDown.current = false;
		if (!markerId.current) {
			return;
		}
	}, [toolsType, markersType]);

	const clickEvent = useCallback(event => {
		if (!_.includes(clickTypes, toolsType)) {
			return;
		}

		if (event.target !== markersRef.current) {
			const markerNode = event.target.closest('[data-id]');
			if (markerNode) {
				const id = markerNode.getAttribute('data-id');
				const type = markerNode.getAttribute('data-type');
				setSelectedMarkerAction({ id: _.toNumber(id) });
				markerNode.focus();
			}
		} else {
			if (document.activeElement) {
				document.activeElement.blur();
			}

			if (markers.selected) {
				setSelectedMarkerAction({ id: null });
			} else {
				markerId.current = new Date().getTime();
				const coordinates = getCoordinates(markersRef.current, event);
				if (coordinates) {
					addMarkerAction({
						id: markerId.current,
						type: markersType,
						coordinates,
						style: toolsAttributes,
					});
				}
			}	
		}
	}, [toolsType, markersType, markers, toolsAttributes]);

	useEffect(() => {
		if (!markersRef.current) {
			return;
		}

		const throttledPaint = _.throttle(mouseMove, 10);
		markersRef.current.addEventListener('mousedown', mouseDown);
		markersRef.current.addEventListener('mousemove', throttledPaint);
		markersRef.current.addEventListener('mouseup', mouseUpAndLeave);
		markersRef.current.addEventListener('mouseleave', mouseUpAndLeave);
		return () => {
			markersRef.current.removeEventListener('mousedown', mouseDown);
			markersRef.current.removeEventListener('mousemove', throttledPaint);
			markersRef.current.removeEventListener('mouseup', mouseUpAndLeave);
			markersRef.current.removeEventListener('mouseleave', mouseUpAndLeave);
		};
	}, [toolsType, markersType, toolsAttributes, markers]);

	useEffect(() => {
		if (!markersRef.current) {
			return;
		}

		markersRef.current.addEventListener('click', clickEvent);
		return () => {
			markersRef.current.removeEventListener('click', clickEvent);
		};
	}, [toolsType, markersType, markers, toolsAttributes]);

	return (
		<div className={style.markers} contentEditable={_.includes(clickTypes, toolsType)}>
			<SVG
				id="markers"
				width={editor.width}
				height={editor.height}
				ref={markersRef}
			>
				{renderMarkers(markers, toolsType)}
			</SVG>
		</div>
	);
};

export default Markers;
