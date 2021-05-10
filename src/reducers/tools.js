import { SET_SELECTED_TOOL, SET_ATTRIBUTE } from 'actions/types';
import { MARKERS, TOOLS } from 'utils/const';

const initialState = {
	selected: TOOLS.TEXT,
	settings: {
		[TOOLS.ARROW]: {},
		[TOOLS.SHAPE]: {
			selected: MARKERS.RECTANGLE,
		},
		[TOOLS.TEXT]: {
			selected: MARKERS.TEXT,
		},
		[TOOLS.PAINTER]: {
			size: 6,
		},
		[TOOLS.SIZER]: {},
	},
	attributes: {
		fill: 'rgba(0,0,0,0.05)',
		fillText: 'rgba(63,81,181,1)',
		stroke: 'rgba(244,67,54,1)',
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
		case SET_ATTRIBUTE:
			return {
				...state,
				attributes: {
					...state.attributes,
					[action.payload.type]: action.payload.value,
				},
			};
		default:
			return state;
	}
};

export default toolsReducer;
