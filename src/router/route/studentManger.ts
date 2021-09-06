import StudentManger from '../../pages/studentManger/studentManger'

const StudentMangers: shouldRenderProps[] = [
    {
        path: '/student-manger',
        icon: 'icon-xueyuanguanli',
        title: "学员管理",
        auth: true,
        component: StudentManger
    },
]

export default StudentMangers