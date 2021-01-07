import React, { FC } from "react";
import { Result, Button } from "antd";
import { RouteChildrenProps } from "react-router-dom";

const Nopage: FC<RouteChildrenProps> = (props) => {
  const {history}=props
  const backHome=()=>{
    history.push('/home')
  }
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button onClick={backHome} type="primary">Back Home</Button>}
    />
  );
};

export default Nopage;
