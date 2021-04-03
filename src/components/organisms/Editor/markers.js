import React, { useState, useRef, useEffect, useCallback } from 'react';
import _ from 'lodash';

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

const Markers = () => {
    const isPainting = useRef(false);
    const markerId = useRef(undefined);
	const markersRef = useRef();
	const mapHooksToState = state => ({
		markers: state.markers,
        editor: state.editor,
	});
	const [
		{ markers, editor },
		{ addMarker: addMarkerAction, updateMarker: updateMarkerAction },
	] = useRedux(mapHooksToState, { addMarker, updateMarker });

	const startPaint = useCallback(event => {
        console.log('startPaint');
        isPainting.current = true;

		markerId.current = new Date().getTime();
		const coordinates = getCoordinates(markersRef.current, event);
		if (coordinates) {
			addMarkerAction({
				id: markerId.current,
				type: 'rectangle',
				coordinates,
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
			<svg
				id="markers"
				width={editor.width}
				height={editor.height}
				xmlns="http://www.w3.org/2000/svg"
				ref={markersRef}
			/>
		</div>
	);
};

export default Markers;
