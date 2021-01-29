import { Card, message } from "antd";
import { FC, useState } from "react";
import { Form, Row, Col, Input, Button, Table, Space, Popconfirm } from "antd";
import { useRequest } from "ahooks";
import { handleService } from "../../utils/request";
import dayjs from 'dayjs'

interface UserProps {
  id: string;
  key: number;
  gender: number;
  username: string;
  nickname: string;
  createTime:string,
  updateTime:string
}
enum gender {
  男 = 1,
  女 = 2,
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
      debounceInterval: 300,
      paginated: true,
      refreshDeps: [searchData],
      formatResult: (result: any) => {
        const { data } = result;
        data.list = data.list.map((item: UserProps, index: number) => {
          item.key = index;
          item.createTime=dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')
          item.updateTime=dayjs(item.updateTime).format('YYYY-MM-DD HH:mm:ss')
          return item;
        });
        return data;
      },
    }
  );
  const { run } = useRequest(handleService, {
    manual: true,
    onSuccess: (result) => {
      if (result) {
        message.success("删除成功");
        refresh();
      }
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
    tableProps.pagination.showTotal = (total, range) =>
      `${range[0]}-${range[1]} of ${total} items`;
    return tableProps;
  };
  const deleteUser = (id: string) => {
    run({ data: { id }, method: "DELETE", url: "deleteUser" });
  };
  const updateUser = (id: string) => {
    console.log(id);
  };
  return (
    <Card>
      {formSearch()}
      <Table<UserProps>
        {...formatterPagination()}
        scroll={{ scrollToFirstRowOnChange: true, x: 1500, y: 550 }}
      >
        <Column<UserProps> title="姓名" dataIndex="username" key="age" />
        <Column<UserProps>
          title="性别"
          dataIndex="gender"
          key="gender"
          render={(text) => <>{gender[text]}</>}
        />
        <Column<UserProps> title="昵称" dataIndex="nickname" key="nickname" />
        <Column<UserProps> title="创建时间" dataIndex="createTime" key="createTime" />
        <Column<UserProps> title="修改时间" dataIndex="updateTime" key="updateTime" />
        <Column<UserProps>
          title="操作"
          width={200}
          key="action"
          fixed="right"
          render={(text, record) => (
            <Space size="middle">
              <Button
                type="primary"
                onClick={() => {
                  updateUser(record.id);
                }}
              >
                编辑
              </Button>
              <Popconfirm
                title="确认删除?"
                onConfirm={() => {
                  deleteUser(record.id);
                }}
                onCancel={() => {
                  console.log("点击了取消");
                }}
                okText="确认"
                cancelText="取消"
              >
                <Button>删除</Button>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
    </Card>
  );
};

export default User;
