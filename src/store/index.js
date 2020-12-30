import { createStore, compose } from 'redux';
import reducers from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(preState) {
	const store = createStore(reducers, preState, composeEnhancers());

	if (module.hot) {
		module.hot.accept('../reducers', () => {
			const nextReducers = require('../reducers').default; // eslint-disable-line global-require
			store.replaceReducer(nextReducers);
		});
	}

	return store;
}
