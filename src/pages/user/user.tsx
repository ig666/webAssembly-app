import { Card } from "antd";
import { FC, useState } from "react";
import { Form, Row, Col, Input, Button, Table } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { handleService } from "../../utils/request";
const { Column } = Table;

const User: FC = () => {
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();
  const { data, loading, run } = useRequest(handleService, {
    manual: true,
    formatResult: (result: any) => {
      const { data } = result;
      return data.list.map((item: any, index: number) => {
        item.key = index;
        return item;
      });
    },
  });

  const getFields = () => {
    let children = (
      <Col span={8}>
        <Form.Item name="username" label="用户名称:">
          <Input placeholder="请输入用户名称" />
        </Form.Item>
      </Col>
    );
    return children;
  };

  const onFinish = (values: any) => {
    run({
      data: { pageIndex: 1, pageSize: 2, ...values },
      method: "GET",
      url: "getListBypage",
    });
  };
  const formSearch = () => {
    return (
      <Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={onFinish}
      >
        <Row gutter={24}>{getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button
              style={{ margin: "0 8px" }}
              onClick={() => {
                form.resetFields();
              }}
            >
              重置
            </Button>
            <Button
              type="text"
              style={{ fontSize: 12 }}
              onClick={() => {
                setExpand(!expand);
              }}
            >
              {expand ? <UpOutlined /> : <DownOutlined />} 高级搜索
            </Button>
          </Col>
        </Row>
      </Form>
    );
  };
  return (
    <Card>
      {formSearch()}
      <Table dataSource={data}>
        <Column title="姓名" dataIndex="username" key="age" />
        <Column title="性别" dataIndex="gender" key="gender" />
        <Column title="昵称" dataIndex="nickname" key="nickname" />
      </Table>
    </Card>
  );
};

export default User;
