import { ADD_MARKER, UPDATE_MARKER } from './types';

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
