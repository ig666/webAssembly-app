import React, { FC } from 'react'
import { RouteChildrenProps } from 'react-router-dom'
import MyInput from './myInput'

const FlowList: FC<RouteChildrenProps> = (props) => {
    const inputChange=(value:string)=>{
        console.log(value,'父组件change触发')
    }
    return (
        <>
        <div>FlowList</div>
        <MyInput   value=''  onChange={inputChange} maxLength={10} />
        </>
    )
}

export default FlowList