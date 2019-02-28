import {listType} from './constant';
import { message } from 'antd';
import http from '../../../utils/http'
import apiUrl from '../../../constants/apis';

const userList = (data) => ({
  type: listType.GET_DATA,
  payload: {
    data,
    reload:true
  }
})
export const getUserList = (params) => async (dispatch, getState) => {
  try {
      let response = await http.get(apiUrl.getUserList, params);
      if (response.result) {
          await dispatch(userList(response.data));
      } else {
          //返回失败
      }
  } catch (error) {
      console.log('error: ', error)
  }
}
