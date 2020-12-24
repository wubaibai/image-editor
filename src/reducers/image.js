const initialState = {
	data: undefined,
	width: 0,
	height: 0,
};

const imageReducer = (state = initialState, action) => {
	if (action.type === 'ADD_IMAGE') {
		return {
			...state,
			data: action.payload.data,
			width: action.payload.width,
			height: action.payload.height,
		};
	}

	return state;
};

export default imageReducer;
