import produce from 'immer';
import _ from 'lodash';

import { ADD_MARKER, UPDATE_MARKER } from 'actions/types';

const initialState = {
	seleted: {
		id: undefined,
	},
	// each markers' id
	list: [],
	// each markers' data
	data: {},
};

const markersReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_MARKER:
			return produce(state, draft => {
				draft.list.push(action.payload.id);
				draft.data[action.payload.id] = action.payload.data;
			});
		case UPDATE_MARKER:
			return produce(state, draft => {
				draft.data[action.payload.id] = _.merge(draft.data[action.payload.id], action.payload.data);
			});
		default:
			return state;
	}
};

export default markersReducer;
