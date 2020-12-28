import { SET_EDITOR_SIZE } from './types';

export const setEditorSize = payload => {
	return {
		type: SET_EDITOR_SIZE,
		payload: {
			width: payload.width,
			height: payload.height,
		},
	};
};
