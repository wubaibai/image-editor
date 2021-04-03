import { ADD_MARKER, UPDATE_MARKER } from './types';

export const addMarker = ({ id, type, coordinates }) => {
	return {
		type: ADD_MARKER,
		payload: {
			id,
			data: {
				type,
				style: {},
				position: {
					start: {
						x: coordinates.x,
						y: coordinates.y,
					},
					end: {
						x: undefined,
						y: undefined,
					},
					width: undefined,
					height: undefined,
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
