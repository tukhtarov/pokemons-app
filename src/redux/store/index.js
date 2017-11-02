import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from '../reducers';
import rootSaga from '../sagas';

const configureStore = (initialState) => {
    const sagaMiddleware = createSagaMiddleware();
    const middleware = [sagaMiddleware];

    const store = createStore(
        reducers,
        initialState,
        applyMiddleware(...middleware)
    );
    sagaMiddleware.run(rootSaga);
    return store;
};

export default configureStore({});