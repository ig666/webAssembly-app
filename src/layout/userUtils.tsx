import React, { FC, useState, useRef, useEffect } from "react";
import { AutoComplete, Input, Button, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { makeStyles } from "@material-ui/styles";
import Routers from "../router";
import { treeToList } from "../utils";
import { useHistory } from "react-router-dom";
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";

interface props {
  width: string;
}

let list = treeToList(Routers);
let nameArr = list.map((item) => ({ value: item.title }));
const useStyles = makeStyles({
  root: (props: props) => ({
    width: props.width,
    transition: "all 0.4s",
  }),
  box: {
    display: "flex",
    alignItems: "center",
    zIndex:1
  },
});
const UserUtils: FC = () => {
  const fourInput = useRef<Input>(null);
  const [showInput, setShowInput] = useState(false);
  const [exit,setExit]=useState(false)
  const classes = useStyles({ width: showInput ? "100%" : "0" });
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const history = useHistory();

  //全屏按钮
  const magnify = () => {
    if (exit) {
      return (
        <Button
          onClick={() => {
            setExit(false)
            document.exitFullscreen();
          }}
          style={{ marginLeft: '3vw' }}
          type="primary"
          shape="circle"
          icon={<FullscreenExitOutlined />}
        />
      );
    } else {
      return (
        <Button
          onClick={() => {
            setExit(true)
            document.documentElement.requestFullscreen();
          }}
          style={{ marginLeft: '3vw' }}
          type="primary"
          shape="circle"
          icon={<FullscreenOutlined />}
        />
      );
    }
  };
  useEffect(() => {
    if (fourInput.current) {
      fourInput.current.focus();
    }
  }, [showInput]);
  const onSearch = (val: string) => {
    let serachData: { value: string }[];
    if (val) {
      serachData = nameArr.filter((item) => item.value.indexOf(val) !== -1);
    } else {
      serachData = [];
    }
    setOptions(serachData);
  };
  const onSelect = (val: string) => {
    let goPath = list.filter((item) => item.title === val);
    history.push(goPath[0].path, { fPath: goPath[0]?.fPath });
  };
  //页面搜索框
  const renderSearch = () => {
    if (showInput) {
      return (
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <AutoComplete
              options={options}
              className={classes.root}
              onSearch={onSearch}
              onSelect={onSelect}
            >
              <Input
                ref={fourInput}
                onBlur={() => {
                  setShowInput(false);
                }}
                placeholder="搜索"
                prefix={<SearchOutlined />}
              />
            </AutoComplete>
          </Col>
        </Row>
      );
    } else {
      return (
        <div
          onClick={() => {
            setShowInput(true);
          }}
          style={{width:192, fontSize: 15, cursor: 'pointer' }}
        >
          <SearchOutlined />
          <span style={{ marginLeft: 15, color: "#BFBFBF" }}>搜索</span>
        </div>
      );
    }
  };
  return (
    <div className={classes.box}>
      {renderSearch()}
      {magnify()}
    </div>
  );
};

export default UserUtils;
