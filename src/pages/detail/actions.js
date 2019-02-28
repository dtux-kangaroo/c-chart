import {detailType} from './constant';
import { message as Message } from 'antd';
import http from '../../utils/http';
import apiUrl from '../../constants/apis'
export const getDetailData = (params) => async (dispatch, getState) => {
  try {
      dispatch({
        type:detailType.SWITCH_LOADING_STATUS,
        payload:true
      });
      const  response = await http.get(apiUrl.getDetailData, params);
      const {data,success,message} =response
      if (success) {
          dispatch({
            type:detailType.SWITCH_LOADING_STATUS,
            payload:false
          });
          dispatch({
            type: detailType.GET_DETAIL_DATA,
            payload: data
          });
      } else {
        Message.error(message);
      }
  } catch (error) {
      console.log('error: ', error)
  }
}