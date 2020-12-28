import { SET_EDITOR_SIZE } from 'actions/types';

const initialState = {
	width: 0,
	height: 0,
};

const editorReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_EDITOR_SIZE:
			return {
				...state,
				width: action.payload.width,
				height: action.payload.height,
			};
		default:
			return state;
	}
};

export default editorReducer;
