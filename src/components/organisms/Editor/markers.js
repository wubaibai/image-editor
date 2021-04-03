import React, { useState, useRef, useEffect, useCallback } from 'react';
import _ from 'lodash';

import { addMarker, updateMarker } from 'actions/markers';
import useRedux from 'utils/hooks/useRedux';
import style from './index.css';

const Markers = () => {
    const isPainting = useRef(false);
	const markersRef = useRef();
	const [markerId, setMarkerId] = useState(undefined);
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
	}, []);

    const paint = useCallback(event => {
        if (!isPainting.current) {
            return;
        }

        console.log('paint');
    }, []);

	const exitPaint = useCallback(event => {
        console.log('exitPaint');
		isPainting.current = false;
    }, []);

	useEffect(() => {
        if (!markersRef.current) {
            return;
        }

        const throttledPaint = _.throttle(paint, 350);
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
