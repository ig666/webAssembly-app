import React, { FC, useState, useRef, useEffect } from "react";
import { AutoComplete, Input, Button } from "antd";
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
    transition: "all 0.2s",
  }),
  box: {
    display: "flex",
    alignItems: "center",
  },
});
const UserUtils: FC = () => {
  const fourInput = useRef<Input>(null);
  const [showInput, setShowInput] = useState(false);
  const classes = useStyles({ width: showInput ? "15vw" : "0vw" });
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const history = useHistory();
  const magnify = () => {
    if (document.fullscreenElement) {
      return (
        <Button
          onClick={() => {
            document.exitFullscreen();
          }}
          style={{ marginLeft: 30 }}
          type="primary"
          shape="circle"
          icon={<FullscreenExitOutlined />}
        />
      );
    } else {
      return (
        <Button
          onClick={() => {
            document.documentElement.requestFullscreen();
          }}
          style={{ marginLeft: 30 }}
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
  const renderSearch = () => {
    if (showInput) {
      return (
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
      );
    } else {
      return (
        <div
          onClick={() => {
            setShowInput(true);
          }}
          style={{ fontSize: 15, cursor: 'pointer' }}
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
