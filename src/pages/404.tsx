import React, { FC, useEffect, useRef } from "react";
import { Button } from "antd";
import { RouteChildrenProps } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import lottie from "lottie-web";
import animationJsonData from "../animationJson/42479-page-not-found-404.json";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

const Nopage: FC<RouteChildrenProps> = (props) => {
  const { history } = props;
  const node = useRef<HTMLDivElement>(null);
  const calsses = useStyles();
  useEffect(() => {
    const lot = lottie.loadAnimation({
      container: node.current!,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationJsonData,
    });
    lot.play();
    return () => {
      lot.stop();
    };
  }, []);
  const backHome = () => {
    history.push("/home");
  };
  return (
    <div className={calsses.root}>
      <div style={{ height: "70vh" }} ref={node}></div>
      <Button onClick={backHome} type="primary">
        返回
      </Button>
    </div>
  );
};

export default Nopage;
