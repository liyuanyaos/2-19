import React, { useEffect, useState } from "react";
import { Input, Select, DatePicker, Button, Flex } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { doctorlist, adddoctor } from "../../../server/index";
const { RangePicker } = DatePicker;

function Doctor() {
  const [count, setCount] = useState([]);
  useEffect(() => {
    console.log("组件挂载");
    console.log(11111);
    doctorlist().then((res) => console.log(res));
    adddoctor(
      JSON.stringify({
        userId: 100,
        userName: "string",
        nickname: "string",
        headimgurl: "string",
        regtype: "string",
        remark: "string",
        name: "string",
        sex: "string",
        region: "string"
      }),
      { "Content-Type": "application/json" }
    )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div>
      <div className="flex justify-around w-[78vw] items-center">
        手机w
        <Input className="w-[13vw]" placeholder="请输入" />
        昵称
        <Input className="w-[13vw]" placeholder="请输入" />
        地区
        <Input className="w-[13vw]" placeholder="请输入" />
        <Select
          defaultValue="lucy"
          style={{
            width: 120
          }}
          onChange={handleChange}
          options={[
            {
              value: "jack",
              label: "Jack"
            },
            {
              value: "lucy",
              label: "Lucy"
            },
            {
              value: "Yiminghe",
              label: "yiminghe"
            },
            {
              value: "disabled",
              label: "Disabled",
              disabled: true
            }
          ]}
        />
        <RangePicker />
      </div>
      <div className=" mt-3 mb-3">
        <Button type="primary" icon={<SearchOutlined />}>
          搜收
        </Button>
        <Button className=" ml-2" type="primary" icon={<SearchOutlined />}>
          重置
        </Button>
      </div>
      <Flex wrap="wrap" gap="small" className="site-button-ghost-wrapper">
        <Button type="primary">新增</Button>
        <Button>修改</Button>
        <Button type="dashed">删除</Button>
        <Button type="primary" danger>
          导出
        </Button>
      </Flex>
      <div>
        <div className="mydiv flex justify-between">
          <div>
            <input type="checkbox"></input>
          </div>
          <div>用户id</div>
          <div>手机</div>
          <div>昵称</div>
          <div>姓名</div>
          <div>性别</div>
          <div>地区</div>
          <div>openid</div>
          <div>unionid</div>
          <div>图片</div>
          <div>注册类型</div>
          <div>创建时间</div>
          <div>操作</div>
        </div>
        <div className="flex justify-between">
          <div>
            <input type="checkbox"></input>
          </div>
          <div>1046</div>
          <div></div>
          <div>达瓦</div>
          <div></div>
          <div></div>
          <div></div>
          <div>openid</div>
          <div>unionid</div>
          <div>图片</div>
          <div>微信公众号</div>
          <div>2022-02-28 11:38:29</div>
          <div>编辑</div>
        </div>
      </div>
      我是专家管理
    </div>
  );
}

export default Doctor;
