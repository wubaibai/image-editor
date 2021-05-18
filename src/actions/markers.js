import { ADD_MARKER, UPDATE_MARKER, SET_SELECTED_MARKER, SET_DRAG_START } from './types';

export const addMarker = ({ id, type, style, coordinates }) => {
	return {
		type: ADD_MARKER,
		payload: {
			id,
			data: {
				type,
				style,
				position: {
					start: {
						x: coordinates.x,
						y: coordinates.y,
					},
					end: {
						x: coordinates.x,
						y: coordinates.y,
					},
				},
			},
		},
	};
};

export const updateMarker = ({ id, data }) => {
	return {
		type: UPDATE_MARKER,
		payload: {
			id,
			data,
		},
	};
};

export const setSelectedMarker = ({ id }) => {
	return {
		type: SET_SELECTED_MARKER,
		payload: {
			id,
		},
	};
};

export const setDragStart = ({ x, y }) => {
	return {
		type: SET_DRAG_START,
		payload: {
			x,
			y,
		},
	};
};
