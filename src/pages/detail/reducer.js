import {detailType} from './constant';
const initialState = {
  detailData: [],
  loading:true
};
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case detailType.GET_DETAIL_DATA:
      return Object.assign({}, state, {
        detailData: payload,
      });
    case detailType.SWITCH_LOADING_STATUS:
      return Object.assign({}, state, {
        loading: payload,
      });
    default:
      return state;
  }
};