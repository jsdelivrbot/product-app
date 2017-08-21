import *  as actions from './actions'

export const userReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case actions.CREATE_USER_SUCCESS:
            return { users: [...state.users, action.payload] };
        case actions.GETTING_USER_SUCCESS:
            return { users: [...action.payload] };
        default:
            return state;
    }
};
