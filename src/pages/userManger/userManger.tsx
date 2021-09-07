import { FC, useState } from "react";
import {
  Card,
  message,
  Form,
  Row,
  Col,
  Input,
  Button,
  Table,
  Space,
  Popconfirm,
  Modal,
} from "antd";
import { useRequest } from "ahooks";
import { handleService } from "../../utils/request";
import dayjs from "dayjs";
import CqTableUtils from "../../components/Cq-TableUtils";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { gender, col } from "../../option";

const { Column } = Table;

const UserManger: FC = () => {
  //状态类
  const [tableSize, setTableSize] = useState<SizeType>("middle");
  const [searchData, setSearchData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  //请求类
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
        if (!result) return;
        const { data } = result;
        data.list = data.list.map((item: UserProps, index: number) => {
          item.key = index;
          item.createTime = dayjs(item.createTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          item.updateTime = dayjs(item.updateTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
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
  const modalRequest = useRequest(handleService, {
    manual: true,
    onSuccess: (result) => {
      if (result) {
        setModalVisible(false);
        modalForm.resetFields();
        message.success("编辑成功");
        refresh();
      }
    },
  });
  //方法类
  const getFields = () => {
    let children = (
      <Col lg={col.lg} md={col.md} sm={col.sm} xs={col.xs}>
        <Form.Item name="username" label="用户名称:">
          <Input placeholder="请输入用户名称" />
        </Form.Item>
      </Col>
    );
    return children;
  };
  const formSearch = () => {
    return (
      <Card style={{ marginBottom: "15px" }}>
        <Form
          form={form}
          name="advanced_search"
          className="ant-advanced-search-form"
          onFinish={(values: any) => {
            setSearchData(values);
          }}
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
                  setSearchData("");
                }}
              >
                重置
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
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
  const updateUser = (row: any) => {
    setModalVisible(() => {
      modalForm.setFieldsValue(row);
      return true;
    });
  };
  const renderAction = (text: string, record: UserProps) => {
    return (
      <Space size="middle">
        <Button
          type="primary"
          onClick={() => {
            updateUser(record);
          }}
        >
          编辑
        </Button>
        <Popconfirm
          title="确认删除?"
          onConfirm={() => {
            run({
              data: { id: record.id },
              method: "DELETE",
              url: "deleteUser",
            });
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
    );
  };
  return (
    <>
      {formSearch()}

      {/* S table */}
      <Card>
        <CqTableUtils refresh={refresh} setTableSize={setTableSize} />
        <Table<UserProps>
          {...formatterPagination()}
          scroll={{ scrollToFirstRowOnChange: true, x: 1500 }}
          size={tableSize}
        >
          <Column title="姓名" dataIndex="username" key="age" />
          <Column
            title="性别"
            dataIndex="gender"
            key="gender"
            render={(text: number) => <>{gender[text]}</>}
          />
          <Column title="昵称" dataIndex="nickname" key="nickname" />
          <Column title="创建时间" dataIndex="createTime" key="createTime" />
          <Column title="修改时间" dataIndex="updateTime" key="updateTime" />
          <Column<UserProps>
            title="操作"
            width={180}
            key="action"
            render={renderAction}
          />
        </Table>
      </Card>
      {/* E table */}

      {/* S 弹窗 */}
      <Modal
        title="编辑用户"
        visible={modalVisible}
        onOk={() => {
          modalForm.submit();
        }}
        okButtonProps={{ loading: modalRequest.loading }}
        onCancel={() => {
          setModalVisible(false);
          modalForm.resetFields();
        }}
      >
        <Form
          form={modalForm}
          name="control-hooks"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          onFinish={(values: any) => {
            modalRequest.run({
              data: values,
              method: "POST",
              url: "updateUser",
            });
          }}
        >
          <Form.Item name={"id"} hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: "请输入用户名称!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="nickname" label="昵称">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="密码">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      {/* E 弹窗 */}
    </>
  );
};

export default UserManger;
