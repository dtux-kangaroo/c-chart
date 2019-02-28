import Loadable from 'react-loadable';
import Loading from 'components/loading';
import MainLayout  from 'layout/mainLayout';
import SideLayout  from 'layout/SideLayout';
import TopLayout  from 'layout/topLayout';
const Home = Loadable({loader: () => import('../pages/home'),loading: Loading});
const UserList = Loadable({loader: () => import('../pages/user/list'),loading: Loading});
const Page404 = Loadable({loader: () => import('../pages/error/404'),loading: Loading});
const Markdown = Loadable({loader: () => import('../pages/markdown'),loading: Loading});
const Swiper = Loadable({loader: () => import('../pages/swiper'),loading: Loading});
const JsonView = Loadable({loader: () => import('../pages/jsonview'),loading: Loading});
const Video = Loadable({loader:() => import('../pages/video'),loading: Loading});
const UploadAndDown = Loadable({ loader: () => import('../pages/uploadAndDown'), loading: Loading })
const SearchTable = Loadable({ loader: () => import('../pages/searchTable'), loading: Loading });
const List = Loadable({ loader: () => import('../pages/lists'), loading: Loading });
const Detail=Loadable({loader:() => import('../pages/detail'),loading: Loading});
const Draggable=Loadable({loader:() => import('../pages/draggable'),loading: Loading});
const TextEditor=Loadable({loader:() => import('../pages/textEditor'),loading: Loading});
const ResultSuccess=Loadable({loader:() => import('../pages/resultSuccess'),loading: Loading});
const ResultFailure=Loadable({loader:() => import('../pages/resultFailure'),loading: Loading});
const CodeEditor=Loadable({loader:() => import('../pages/codeEditor'),loading: Loading});
const Websocker=Loadable({loader:() => import('../pages/websocker'),loading: Loading});
const Form=Loadable({loader:() => import('../pages/form'),loading: Loading});
const FormSearch=Loadable({loader:() => import('../pages/formSearch'),loading: Loading});
const Analysis=Loadable({loader:() => import('../pages/analysis'),loading: Loading});
const Login=Loadable({loader:() => import('../pages/auth/login'),loading: Loading});
const Register=Loadable({loader:() => import('../pages/auth/register'),loading: Loading});
const Charts=Loadable({loader:() => import('../pages/charts'),loading: Loading});
const routerConf = [
  {
    path:'/',
    redirect:'/index'
  },
  {
    path: '/index',
    layout: MainLayout,
    component: UserList,
    children: [
      {
        path: '/analysis',
        layout: MainLayout,
        component: Analysis
      },
      {
        path: '/upload',
        layout: MainLayout,
        component: UploadAndDown,
      },
      {
        path: '/map',
        layout: MainLayout,
        component: UploadAndDown,
      },
      {
        path: '/searchTable',
        layout: MainLayout,
        component: SearchTable,
      },
      {
        path: '/list',
        layout: MainLayout,
        component: List,
      },
      {
        path: '/workbench',
        layout: MainLayout,
        component: Home,
      }
    ]
  },
  {
    path: '/back',
    layout: MainLayout,
    component: UserList,
    children:[
      {
        path: '/form',
        layout: MainLayout,
        component: Form
      },
      {
        path: '/form_common',
        layout: MainLayout,
        component: Page404
      },
      {
        path: '/form_search',
        layout: MainLayout,
        component: FormSearch
      },
      {
        path:'/detail',
        layout: MainLayout,
        component: Detail,
      },
      {
        path:'/result/success',
        layout: MainLayout,
        component: ResultSuccess,
      },
      {
        path:'/result/failure',
        layout: MainLayout,
        component: ResultFailure,
      },
    ]
  },
  {
    path: '/part',
    layout: MainLayout,
    component: UserList,
    children:[
      {
        path:'/draggable',
        layout: MainLayout,
        component: Draggable,
       },
       {
          path: '/drag',
          layout: MainLayout,
          component: Page404
       },
       {
          path: '/code',
          layout: MainLayout,
          component: CodeEditor
       },
       {
          path: '/websocker',
          layout: MainLayout,
          component: Websocker
       },
       {
        path:'/textEditor',
        layout: MainLayout,
        component: TextEditor,
       },
       {
         path: '/md',
         layout: MainLayout,
         component: Markdown
       },
       {
        path: '/swiper',
        layout: MainLayout,
        component: Swiper
       },
       {
         path: '/jsonview',
         layout: MainLayout,
         component: JsonView
       },
       {
        path: '/code',
        layout: MainLayout,
        component: CodeEditor
       },
       {
         path: '/video',
         layout: MainLayout,
         component: Video
       }
    ]
  },
  {
   path:'/login',
   layout: null,
   component: Login,
  },
  {
    path:'/register',
    layout: null,
    component: Register,
  },
  {
    path: '/chart/:type',
    layout: null,
    component: Charts,
  },
  {
    path: '*',
    layout: MainLayout,
    component: Page404,
  }
];

export default routerConf;
