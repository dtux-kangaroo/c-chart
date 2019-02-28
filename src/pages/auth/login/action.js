import {loginType} from './constant';
import { message } from 'antd';
import http from '../../../utils/http'
import apiUrl from '../../../constants/apis';

const loginData = (data) => ({
  type: loginType.GET_LOGIN_DATA,
  payload: data
})
export const getLoginData = (params) => async (dispatch, getState) => {
  try {
      let response = await http.get(apiUrl.getUserData, params);
      if (response.result) {
          await dispatch(loginData(response.data));
      } else {
          //返回失败
      }
  } catch (error) {
      console.log('error: ', error)
  }
}

