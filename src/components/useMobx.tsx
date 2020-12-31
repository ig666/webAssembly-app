import { FC } from "react";
import { inject, observer } from "mobx-react";
import { Button } from 'antd'

interface MyStateProps {
    mystate?: {
        num1?: number,
        num2?: number,
        addNum1?: () => void,
        addNum2?: () => void,
        total?: number,
    }
}

const UseMobx: FC<MyStateProps> = inject('mystate')(observer((props) => {
    return (
        <div>
            <p>total：{props.mystate?.total}</p>
            <p>num1：{props.mystate?.num1}</p>
            <p>num2：{props.mystate?.num2}</p>
            <Button onClick={props.mystate?.addNum1}>addNum1</Button>
            <Button onClick={props.mystate?.addNum2}>addNum2</Button>
        </div>
    )
}))

export default UseMobx