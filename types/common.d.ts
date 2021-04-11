//全局泛型文件

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface shouldRenderProps {
    path: string,
    icon?: string,
    title: string,
    fPath?: string,
    auth?: boolean,
    hidden?: boolean,
    component?: React.FC<T>,
    children?: shouldRenderProps[]
}
