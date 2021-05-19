import React, { createContext, useContext } from 'react';
import { reducer } from './reducers';
import { createStore } from 'redux';
const StoreContext = createContext();
const { Provider }  = StoreContext;

export const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// const StoreProvider = ({value = [], ...props}) => {
//     const [state, dispatch] = useProductReducer({
//         products: [],
//         cart: [],
//         cartOpen: false,
//         categories: [],
//         currentCategory: '',
//     });
//     return <Provider value={[state, dispatch]} {...props} />
// }

// const useStoreContext = () => {
//     return useContext(StoreContext);
// };
