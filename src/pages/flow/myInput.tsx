//input第一题
import { ChangeEvent, FC, InputHTMLAttributes, useState } from "react";

interface myInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "maxLength" | "onChange"
  > {
  value: string;
  defalueValue?: string;
  maxLength: number;
  onChange: (val: string) => void;
}

const MyInput: FC<myInputProps> = (props) => {
  const { value, maxLength, onChange } = props;
  const [myValue, setMyvalue] = useState(value);

  const myChange = (val: ChangeEvent<HTMLInputElement>) => {
    setMyvalue(val.target.value);
    onChange(val.target.value);
  };
  return (
    <>
      <input
        {...props}
        value={myValue}
        onChange={myChange}
        maxLength={maxLength}
        type="text"
      />
      <span>
        {myValue.length}/{maxLength}
      </span>
    </>
  );
};

export default MyInput;

// //首字母大写第二题
// const str='asda_bcs_food'
// let arr=str.split('_')
// arr=arr.map(item=>{
//    return item.replace(/^\S/, s => s.toUpperCase())
// })
// console.log(arr.join('_'),'拼接后')

//扁平化数组转树形结构
interface sTreeProps {
  id: number;
  pid: number;
  text: string;
}
let sTree = [
  { id: 1, pid: 0, text: "1号" },
  { id: 2, pid: 1, text: "2号" },
  { id: 10, pid: 2, text: "2-10号" },
  { id: 3, pid: 1, text: "3号" },
];

function toStree(params: sTreeProps[]) {
  const areaData: sTreeProps[] = [];
  const map: any = {};

  params.forEach((item: sTreeProps) => {
    map[item.id] = item;
  });

  params.forEach((item: sTreeProps) => {
    const parent = map[item.pid];
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      areaData.push(item);
    }
  });
  return areaData
}

let val=toStree(sTree)
console.log(val,'xxx')