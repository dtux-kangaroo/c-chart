import assign from 'object-assign';
import {listType} from './constant';
const initialState = {
  userList: []
};
 const listReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case listType.GET_DATA:
      return Object.assign({}, state, {
        userList: payload,
      });
    default:
      return state;
  }
};
export default listReducer
