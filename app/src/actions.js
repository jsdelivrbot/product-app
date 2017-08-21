import { mergeMap } from 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_FAIL = 'CREATE_USER_FAIL';
export const user = (data) => ({ type: CREATE_USER_REQUEST, payload: data });
const fetchUserCreated = payload => {
    return { type: CREATE_USER_SUCCESS, payload }
};
const fetchUserFail = payload => ({ type: CREATE_USER_FAIL });

export const GETTING_USER_SUCCESS = 'GETTING_USER_SUCCESS';
export const GETTING_USER_REQUEST = 'GETTING_USER_REQUEST';
export const GETTING_USER_FAIL = 'GETTING_USER_FAIL';

export const userGetting = (data) => ({ type: GETTING_USER_REQUEST });
const fetchUsersSuccess = payload => ({ type: GETTING_USER_SUCCESS, payload });
const fetchUsersFail = payload => ({ type: GETTING_USER_FAIL });
export const userAction = action$ =>
    action$.ofType(CREATE_USER_REQUEST)
           .mergeMap(action =>
               Observable.ajax.post(`/users/create`, JSON.stringify(action.payload), {
                             "Content-Type": "application/json"
                         })
                         .map(data => fetchUserCreated(data.response))
                         .catch(fetchUserFail)
           );

export const usersGet = action$ =>
    action$.ofType(GETTING_USER_REQUEST)
           .mergeMap(action =>
               Observable.ajax.getJSON(`/users`)
                         .map(response => fetchUsersSuccess(response))
                         .catch(fetchUsersFail())
           );