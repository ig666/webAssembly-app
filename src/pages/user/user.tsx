import { Card } from "antd";
import { FC, useState } from "react";
import { Form, Row, Col, Input, Button } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { handleService } from "../../utils/request";

const User: FC = () => {
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();
  const { loading, run } = useRequest(handleService, {
    manual: true,
    onSuccess: (result: any) => {
      console.log(result);
    },
  });

  const getFields = () => {
    const count = expand ? 10 : 6;
    const children = [];
    for (let i = 0; i < count; i++) {
      children.push(
        <Col span={8} key={i}>
          <Form.Item
            name={`field-${i}`}
            label={`Field ${i}`}
            rules={[
              {
                required: true,
                message: "Input something!",
              },
            ]}
          >
            <Input placeholder="placeholder" />
          </Form.Item>
        </Col>
      );
    }
    return children;
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    run({
      data: { pageIndex: 1, pageSize: 2 },
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
              Search
            </Button>
            <Button
              style={{ margin: "0 8px" }}
              onClick={() => {
                form.resetFields();
              }}
            >
              Clear
            </Button>
            <Button
              type="text"
              style={{ fontSize: 12 }}
              onClick={() => {
                setExpand(!expand);
              }}
            >
              {expand ? <UpOutlined /> : <DownOutlined />} Collapse
            </Button>
          </Col>
        </Row>
      </Form>
    );
  };
  return <Card>{formSearch()}</Card>;
};

export default User;
