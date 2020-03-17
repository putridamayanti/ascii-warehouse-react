import { BaseUrl } from '../constants/Api';

export function fetchProducts(page = 0) {
    return async dispatch => {
        fetch(BaseUrl + 'api/products?limit=20&skip=' + page)
            .then(result => {
                if (result.status === 200) {
                    return result.text();
                }
            })
            .then(json => {
                var data = JSON.parse(json.toString());
                dispatch({
                    type: 'FETCH_SUCCESS',
                    payload: data
                })
            })
            .catch(error => {
                dispatch({
                    type: 'FETCH_ERROR',
                    payload: error
                })
            })
    }
}
