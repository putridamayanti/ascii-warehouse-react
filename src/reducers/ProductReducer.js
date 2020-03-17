let initialState = {
    loading: true,
    products: [],
    error: ''
};

export default (state = initialState, action) => {
    const result = action.payload;
    console.log(action);
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                products: result
            };
        case 'FETCH_ERROR':
            return {
                ...state,
                loading: false,
                error: 'There is something wrong!'
            };
        default:
            return state;
    }
}
