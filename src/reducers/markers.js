import produce from 'immer';
import _ from 'lodash';

import { ADD_MARKER, UPDATE_MARKER, SET_SELECTED_MARKER } from 'actions/types';

const initialState = {
	selected: null,
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
				draft.selected = action.payload.id;
			});
		case UPDATE_MARKER:
			return produce(state, draft => {
				draft.data[action.payload.id] = _.merge(draft.data[action.payload.id], action.payload.data);
			});
		case SET_SELECTED_MARKER:
			return produce(state, draft => {
				draft.selected = action.payload.id;
			});
		default:
			return state;
	}
};

export default markersReducer;
