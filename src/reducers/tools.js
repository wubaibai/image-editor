import { SET_SELECTED_TOOL } from 'actions/types';

const initialState = {
	selected: '',
	settings: {
		arrow: {},
		shape: {},
		text: {},
		painter: {
			size: 6,
		},
		sizer: {},
	},
	attributes: {
		fillColor: undefined,
		borderColor: '#FF0000',
		strokeWidth: 2,
	},
};

const toolsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SELECTED_TOOL:
			return {
				...state,
				selected: action.payload,
			};
		default:
			return state;
	}
};

export default toolsReducer;
