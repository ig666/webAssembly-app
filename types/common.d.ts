//全局泛型文件

interface shouldRenderProps {
    path: string,
    icon?: string,
    title: string,
    fPath?:string,
    auth?:boolean,
    hidden?:boolean,
    component?: React.FC<T>,
    childrens?: shouldRenderProps[]
}