import { SET_SELECTED_TOOL } from 'actions/types';
import { SHAPES, TOOLS } from 'utils/const';

const initialState = {
	selected: TOOLS.SHAPE,
	settings: {
		[TOOLS.ARROW]: {},
		[TOOLS.SHAPE]: {
			selected: SHAPES.RECTANGLE,
		},
		[TOOLS.TEXT]: {},
		[TOOLS.PAINTER]: {
			size: 6,
		},
		[TOOLS.SIZER]: {},
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
