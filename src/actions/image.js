export const addImage = payload => {
	return {
		type: 'ADD_IMAGE',
		payload: {
			data: payload.data,
			width: payload.width,
			height: payload.height,
		},
	};
};
