import produce from 'immer';
import _ from 'lodash';

import { ADD_MARKER, UPDATE_MARKER, SET_SELECTED_MARKER, SET_DRAG_START } from 'actions/types';

const initialState = {
	selected: null,
	// each markers' id
	list: [],
	// each markers' data
	data: {},
	// drag information
	dragStart: {
		x: null,
		y: null,
	},
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
		case SET_DRAG_START:
			return produce(state, draft => {
				draft.dragStart.x = action.payload.x;
				draft.dragStart.y = action.payload.y;
			});
		default:
			return state;
	}
};

export default markersReducer;
