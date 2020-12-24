import { ADD_IMAGE } from '../actions/types';

const initialState = {
	data: undefined,
	width: 0,
	height: 0,
};

const imageReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_IMAGE:
			return {
				...state,
				data: action.payload.data,
				width: action.payload.width,
				height: action.payload.height,
			};
		default:
			return state;
	}
};

export default imageReducer;
