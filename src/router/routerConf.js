import Loadable from 'react-loadable';
import Loading from 'components/loading';
const Page404 = Loadable({loader: () => import('../pages/error/404'),loading: Loading});
const Charts=Loadable({loader:() => import('../pages/charts'),loading: Loading});
const routerConf = [
  {
    path:'/',
    redirect:'/chart/bar'
  },
  {
    path: '/chart/:type',
    layout: null,
    component: Charts,
  },
  {
    path: '*',
    layout: null,
    component: Page404,
  }
];

export default routerConf;
