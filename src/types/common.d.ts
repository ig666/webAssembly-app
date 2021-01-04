//全局泛型文件

interface shouldRenderProps {
    path: string,
    icon?: string,
    title: string,
    fPath?:string,
    component?: React.FC<T>,
    childrens?: shouldRenderProps[]
}