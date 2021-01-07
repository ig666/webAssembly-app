import Login from '../pages/login/login'
import Content from '../layout/content'
const Logins:shouldRenderProps[]= [
    {
        path:'/login',
        title:"登录",
        hidden:true,
        component:Login
    },
    {
        path:'/',
        title:"主页面",
        hidden:true,
        component:Content
    },
    
]

export default Logins