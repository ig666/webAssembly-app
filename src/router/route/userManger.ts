import UserManger from "./../../pages/userManger/userManger";

const UserMangers: shouldRenderProps[] = [
  {
    path: "/user-manager",
    icon: "icon-zhanghuguanli",
    title: "账户管理",
    auth: true,
    component: UserManger,
  },
];

export default UserMangers;
