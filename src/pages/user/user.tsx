import { Card } from "antd";
import { FC, useState } from "react";
import { Form, Row, Col, Input, Button, Table } from "antd";
import { useRequest } from "ahooks";
import { handleService } from "../../utils/request";

interface UserProps {
  key: number;
  gender: number;
  username: string;
  nickname: string;
}

const { Column } = Table;

const User: FC = () => {
  const [searchData, setSearchData] = useState({});
  const [form] = Form.useForm();
  const { tableProps, refresh } = useRequest(
    ({ current, pageSize }) => {
      return handleService({
        data: { pageSize, pageIndex: current, ...searchData },
        url: "getListBypage",
        method: "GET",
      });
    },
    {
      refreshOnWindowFocus: false,
      paginated: true,
      refreshDeps: [searchData],
      formatResult: (result: any) => {
        const { data } = result;
        data.list = data.list.map((item: any, index: number) => {
          item.key = index;
          return item;
        });
        return data;
      },
    }
  );
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
    setSearchData(values);
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
          </Col>
        </Row>
      </Form>
    );
  };
  const formatterPagination = () => {
    tableProps.pagination.responsive = true;
    tableProps.pagination.showSizeChanger = true;
    tableProps.pagination.showQuickJumper = true;
    tableProps.pagination.showTotal=(total, range) => `${range[0]}-${range[1]} of ${total} items`
    return tableProps;
  };
  return (
    <Card>
      {formSearch()}
      <Table<UserProps> {...formatterPagination()} scroll={{scrollToFirstRowOnChange:true}}>
        <Column title="姓名" dataIndex="username" key="age" />
        <Column title="性别" dataIndex="gender" key="gender" />
        <Column title="昵称" dataIndex="nickname" key="nickname" />
      </Table>
    </Card>
  );
};

export default User;
