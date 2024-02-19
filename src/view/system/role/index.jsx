import { Input, Button, Table, Modal, InputNumber, Select, TreeSelect, Radio, Form } from "antd";
import { SearchOutlined, SyncOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState, useRef, useEffect } from "react";
import { getTreeselect, addDept } from "../../../server/index";
import { FaPen } from "react-icons/fa6";

const columns = [
  {
    title: "部门名称",
    dataIndex: "deptName",
    key: "deptName",
    align: "center"
  },
  {
    title: "负责人",
    dataIndex: "leader",
    key: "leader",
    width: "12%",
    align: "center"
  },
  {
    title: "排序",
    dataIndex: "delFlag",
    key: "delFlag",
    width: "12%",
    align: "center"
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    width: "12%",
    align: "center"
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    width: "30%",
    key: "createTime",
    align: "center"
  },
  {
    title: "操作",
    dataIndex: "cao",
    width: "10%",
    key: "cao",
    align: "center"
  }
];

function Index2() {
  const [checkStrictly] = useState(false);
  let [data, setData] = useState([]);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    }
  };
  useEffect(() => {
    function getArr(arrs, parentId = arrs[0].parentId) {
      let arr = [];
      for (let i = 0; i < arrs.length; i++) {
        if (arrs[i].parentId === parentId) {
          // console.log(arrs[i].deptName);
          let randomKey = Math.random() * 1;
          let obj = {
            ...arrs[i],
            key: arrs[i].deptName || randomKey,
            value: arrs[i].deptName || randomKey,
            title: arrs[i].deptName || randomKey,
            cao: <FaPen></FaPen>,
            status: arrs[i].status === "0" ? <Button danger>正常</Button> : <Button danger>不正常</Button>,
            children: getArr(arrs, arrs[i].deptId)
          };
          arr.push(obj);
        }
      }
      return arr;
    }
    function fn() {
      getTreeselect()
        .then((res) => {
          console.log(res.data.data);
          setData(getArr(res.data.data));
        })
        .catch((err) => console.log(err));
    }
    fn();
  }, []);
  // 弹窗
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //下拉框
  const [value, setValue] = useState();
  const onChange = (newValue) => {
    setValue(newValue);
  };
  //表单提交
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  //数字改变框里的方法
  const onChanges = (value) => {
    console.log("changed", value);
  };
  return (
    <div>
      <main className=" p-2">
        <section>
          <div className="main_head flex items-center">
            <strong className="w-[5vw]">部门名称</strong>
            <Input style={{ width: "15vw" }} placeholder="请输入部门名称" />
            <strong className="w-[5vw] flex justify-center items-center">状态</strong>
            <Input style={{ width: "15vw" }} placeholder="部门状态" />
            <Button className=" ml-2 bg-emerald-200" icon={<SearchOutlined />}>
              搜索
            </Button>
            <Button className=" ml-2 bg-emerald-200" icon={<SyncOutlined />}>
              重置
            </Button>
          </div>
          <Button onClick={showModal} className="w-[10vw] my-2 text-white ml-2 bg-emerald-200" icon={<PlusOutlined />}>
            新建
          </Button>
          <Modal title="添加部门" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form>
              <Form.Item
                label="上级部门"
                name="parentId"
                rules={[
                  {
                    required: true,
                    message: "请输入上级部门!"
                  }
                ]}
              >
                <TreeSelect
                  showSearch
                  style={{
                    width: "100%"
                  }}
                  value={value}
                  dropdownStyle={{
                    maxHeight: 400,
                    overflow: "auto"
                  }}
                  placeholder="Please select"
                  allowClear
                  treeDefaultExpandAll
                  onChange={onChange}
                  treeData={data}
                />
              </Form.Item>
              <div className="flex justify-between items-center">
                <div className="w=[50%]">
                  <div className="w-[100%]">
                    <Form.Item
                      label="部门名称"
                      name="parentId"
                      rules={[
                        {
                          required: true,
                          message: "请输入部门名称!"
                        }
                      ]}
                    >
                      <Input placeholder="请输入部门名称" className="w-[100%]" />
                    </Form.Item>
                  </div>
                  <div className="w-[100%] flex">
                    <Form.Item label="负责人" labelAlign="right" className="text-right w-[90%] ml-auto">
                      <Input placeholder="请输入负责人"></Input>
                    </Form.Item>
                  </div>
                  <div className="w-[100%] flex">
                    <Form.Item label="邮箱" className="w-[84%] ml-auto">
                      <Input placeholder="请输入邮箱"></Input>
                    </Form.Item>
                  </div>
                </div>
                <div className="w-[50%]">
                  <div className="w-[100%]">
                    <Form.Item
                      label="显示排序"
                      name="parentId"
                      rules={[
                        {
                          required: true,
                          message: "请输入显示排序!"
                        }
                      ]}
                    >
                      <InputNumber className="w-[100%]" block min={1} max={10} defaultValue={3} onChange={onChanges} />
                    </Form.Item>
                  </div>
                  <div className="w-[100%] flex">
                    <Form.Item label="联系电话" className="w-[96%] ml-auto">
                      <Input placeholder="请输入联系电话"></Input>
                    </Form.Item>
                  </div>
                  <div className="w-[100%] flex">
                    <Form.Item label="部门状态" className="w-[96%] ml-auto">
                      <Radio.Group>
                        <Radio value={1}>正常</Radio>
                        <Radio value={2}>停用</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </div>
              </div>
            </Form>
            {/* <Form
              className=" mt-2"
              name="basic"
              wrapperCol={{
                span: 16
              }}
              style={{
                maxWidth: 600
              }}
              initialValues={{
                remember: true
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div className="flex justify-start w-[100%]">
                <Form.Item
                  label="上级部门"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "请输入上级部门"
                    }
                  ]}
                  className="w-[100%]"
                >
                  <TreeSelect
                    showSearch
                    style={{
                      width: "100%"
                    }}
                    value={value}
                    dropdownStyle={{
                      maxHeight: 400,
                      overflow: "auto"
                    }}
                    placeholder="Please select"
                    allowClear
                    treeDefaultExpandAll
                    onChange={onChange}
                    treeData={data}
                  />
                </Form.Item>
              </div>
              <div className="w-[100%] flex justify-end items-center">
                <Form.Item
                  label="部门名称"
                  name="username"
                  className="w-[50%]"
                  rules={[
                    {
                      required: true,
                      message: "请输入部门"
                    }
                  ]}
          
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="显示排序"
                  name="password"
                  className="w-[50%]"
                  rules={[
                    {
                      required: true,
                      message: "请输入排序"
                    }
                  ]}
                
                >
                  <InputNumber className=" block" block min={1} max={10} defaultValue={3} onChange={onChanges} />
                </Form.Item>
              </div>
              <div className="flex  justify-center items-center">
                <Form.Item
                  label="负责人"
                  name="username"
                  rules={[
                    {
                      required: false,
                      message: "请输入负责人"
                    }
                  ]}
                  
                >
                  <Input className="flex-1" />
                </Form.Item>
                <Form.Item
                  label="联系电话"
                  name="password"
                  rules={[
                    {
                      required: false,
                      message: "请输入电话"
                    }
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </div>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form> */}
          </Modal>
          <Table
            showSizeChanger={false}
            columns={columns}
            rowSelection={{
              ...rowSelection,
              checkStrictly
            }}
            dataSource={data}
          />
          <button
            onClick={() => {
              addDept({
                create_by: "string",
                create_time: "2024-01-25T08:11:19.710Z",
                update_by: "string",
                update_time: "2024-01-25T08:11:19.710Z",
                remark: "string",
                beginTime: "2024-01-25T08:11:19.710Z",
                endTime: "2024-01-25T08:11:19.710Z",
                deptId: 111,
                parentId: 1111,
                ancestors: "string",
                deptName: "string",
                orderNum: 0,
                leader: "string",
                phone: "string",
                email: "string",
                status: "string",
                delFlag: "string"
              });
            }}
          >
            点击添加
          </button>
        </section>
      </main>
    </div>
  );
}

export default Index2;
