import React, { FC, useState, useRef, RefObject, useEffect } from 'react'
import { AutoComplete, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const UserUtils: FC = () => {
    const fourInput = useRef<RefObject<Input>>(null)
    const [showInput, setShowInput] = useState(false)
    const [options, setOptions] = useState<{ value: string }[]>([]);
    useEffect(()=>{
        console.log(fourInput)
        // if(fourInput.current){
        //     console.log(fourInput)
        // }
    },[showInput])
    const onSelect = (val: string) => {
        console.log(val)
    }
    const onSearch = (val: string) => {
        console.log(val)
    }
    const renderSearch = () => {
        if (showInput) {
            return (
                <AutoComplete
                    options={options}
                    style={{ width: 200 }}
                    onSelect={onSelect}
                    onSearch={onSearch}
                >
                    <Input ref={fourInput.current} onBlur={() => { setShowInput(false) }} placeholder="搜索" prefix={<SearchOutlined />} />
                </AutoComplete>
            )
        } else {
            return (
                <div onClick={()=>{setShowInput(true)}} style={{ fontSize: 20 }}><SearchOutlined /><span style={{ marginLeft: 15 }}>搜索</span></div>
            )
        }
    }
    return (
        <div>{renderSearch()}</div>
    )
}

export default UserUtils