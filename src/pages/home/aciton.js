import {homeType} from './constant';
import { message } from 'antd';
import http from '../../utils/http'
import apiUrl from '../../constants/apis';

const homeData = (data) => ({
  type: homeType.GET_HOME_DATA,
  payload: data
})
export const getHomeData = (params) => async (dispatch, getState) => {
  try {
      let response = await http.get(apiUrl.getHomeData, params);
      if (response.result) {
          await dispatch(homeData(response.data));
      } else {
          //返回失败
      }
  } catch (error) {
      console.log('error: ', error)
  }
}
