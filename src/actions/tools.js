import { SET_SELECTED_TOOL } from './types';

export const setSelectedTool = payload => {
	return {
		type: SET_SELECTED_TOOL,
		payload,
	};
};
