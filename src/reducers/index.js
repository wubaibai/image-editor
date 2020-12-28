import { combineReducers } from 'redux';

import imageReducer from './image';
import editorReducer from './editor';

export default combineReducers({
	image: imageReducer,
	editor: editorReducer,
});
