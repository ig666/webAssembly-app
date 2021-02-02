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
  DatePicker,
} from "antd";
import { useRequest } from "ahooks";
import { handleService } from "../../utils/request";
import dayjs from "dayjs";

const { Column } = Table;
const { RangePicker } = DatePicker;

const PDF: FC = () => {
  //状态类
  const [searchData, setSearchData] = useState({});
  const [form] = Form.useForm();
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
  //方法类
  const getFields = () => {
    let children = (
      <>
        <Col span={8}>
          <Form.Item name="username" label="服务商名称:">
            <Input placeholder="请输入服务商名称" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="username" label="服务人员名称:">
            <Input placeholder="请输入服务人员名称" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="username" label="服务日期:">
            <RangePicker style={{width:'100%'}} />
          </Form.Item>
        </Col>
      </>
    );
    return children;
  };
  const formSearch = () => {
    return (
      <Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={(values) => {
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
  const renderAction = (text: string, record: UserProps) => {
    return (
      <Space size="middle">
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
    <Card>
      {formSearch()}

      {/* S table */}
      <Table<UserProps>
        {...formatterPagination()}
        scroll={{ scrollToFirstRowOnChange: true, x: 1500, y: 550 }}
      >
        <Column title="姓名" dataIndex="username" key="age" />
        <Column title="昵称" dataIndex="nickname" key="nickname" />
        <Column title="创建时间" dataIndex="createTime" key="createTime" />
        <Column title="修改时间" dataIndex="updateTime" key="updateTime" />
        <Column<UserProps>
          title="操作"
          width={200}
          key="action"
          fixed="right"
          render={renderAction}
        />
      </Table>
      {/* E table */}
    </Card>
  );
};

export default PDF;
