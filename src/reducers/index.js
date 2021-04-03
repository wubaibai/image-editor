import { combineReducers } from 'redux';

import imageReducer from './image';
import editorReducer from './editor';
import toolsReducer from './tools';
import markersReducer from './markers';

export default combineReducers({
	image: imageReducer,
	editor: editorReducer,
	tools: toolsReducer,
	markers: markersReducer,
});
