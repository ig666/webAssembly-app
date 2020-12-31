import { FC, useContext } from "react";
import { Button } from 'antd'
import { StoreContext } from '../App'


const UseMobx: FC = () => {
    const state = useContext(StoreContext)

    const addNum1=()=>{
        if(state.addNum1){
            console.log(state,'state====>>>>')
            state.addNum1()
        }
    }
    const addNum2=()=>{
        if(state.addNum2){
            state.addNum2()
        }
    }

    return (
        <div>
            <p>total={state.total}</p>
            <p>num1={state.num1}</p>
            <p>num2={state.num2}</p>
            <Button onClick={addNum1} >addNum1</Button>
            <Button onClick={addNum2}>addNum2</Button>
        </div>
    )
}

export default UseMobx