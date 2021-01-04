//全局泛型文件

interface shouldRenderProps {
    key: number,
    path: string,
    icon?: string,
    title: string,
    component?: React.FC<T>,
    childrens?: shouldRenderProps[]
}