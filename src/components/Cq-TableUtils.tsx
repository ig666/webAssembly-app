import { FC, useState } from "react";
import { Button, Space, Tooltip, Dropdown, Menu } from "antd";
import { makeStyles } from "@material-ui/styles";
import {
  ReloadOutlined,
  ColumnHeightOutlined,
} from "@ant-design/icons";

export interface CqTableUtilsProps {
  refresh: () => void; //刷新函数
  setTableSize: Function; //表格大小函数
}
const useStyle = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  util: {
    cursor: "pointer",
  },
});
/**
 * @表格工具类
 */
const CqTableUtils: FC<CqTableUtilsProps> = (props) => {
  const { refresh, setTableSize, children } = props;
  const classes = useStyle();
  const [status, setStatus] = useState("middle");
  const renderMenu = () => {
    return (
      <Menu
        selectedKeys={[status]}
        onClick={({ key }) => {
          const keys = key as string;
          setTableSize(keys);
          setStatus(keys);
        }}
      >
        <Menu.Item key="middle">
          <Button type={status === "middle" ? "link" : "text"}>默认</Button>
        </Menu.Item>
        <Menu.Item key="large">
          <Button type={status === "large" ? "link" : "text"}>宽松</Button>
        </Menu.Item>
        <Menu.Item key="small">
          <Button type={status === "small" ? "link" : "text"}>紧凑</Button>
        </Menu.Item>
      </Menu>
    );
  };
  return (
    <div className={classes.root}>
      <h3>查询表格</h3>
      <Space size="middle">
        {children}
        <Tooltip title="刷新">
          <ReloadOutlined onClick={refresh} className={classes.util} />
        </Tooltip>
        <Tooltip title="密度">
          <Dropdown
            overlay={renderMenu}
            placement="bottomRight"
            trigger={["click"]}
          >
            <ColumnHeightOutlined className={classes.util} />
          </Dropdown>
        </Tooltip>
      </Space>
    </div>
  );
};

export default CqTableUtils;
