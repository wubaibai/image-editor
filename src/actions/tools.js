import { SET_SELECTED_TOOL, SET_ATTRIBUTE } from './types';

export const setSelectedTool = payload => {
	return {
		type: SET_SELECTED_TOOL,
		payload,
	};
};

export const setAttribute = payload => {
	return {
		type: SET_ATTRIBUTE,
		payload,
	};
};
