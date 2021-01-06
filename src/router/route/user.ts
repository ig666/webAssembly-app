import User from '../../pages/user/user'

const Users:shouldRenderProps[]= [
    {
        path:'/user',
        icon:'icon-facebook',
        title:"用户",
        auth:true,
        component:User
    },
]

export default Users