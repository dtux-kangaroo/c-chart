import global from './reducer';
import home from '../home/reducer';
import auth from '../auth/reducer';
import userList from  '../user/list/reducer';
import detail from '../detail/reducer';
import draggable from '../draggable/reducer';

const appReducer = {
  global,
  home,
  auth,
  userList,
  detail,
  draggable
};
	
	
	
	
	
	

export default appReducer;
