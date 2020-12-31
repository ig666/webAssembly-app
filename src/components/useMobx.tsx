import { FC } from "react";
import MyState from '../store/data/countNum'
import { Button } from 'antd'
import { inject, observer } from "mobx-react";
import { myState } from '../store/stores'
interface props {
    myState: MyState
}

const UseMobx: FC<props> = (props) => {
    const { myState } = props
    return (
        <div>
            <p>num1={myState.num1}</p>
            <p>num2={myState.num2}</p>
            <p>total={myState.total}</p>
            <Button onClick={myState.addNum1}>addNum1</Button>
            <Button onClick={myState.addNum2}>addNum2</Button>
        </div>
    )
}

export default inject(myState)(observer(UseMobx))