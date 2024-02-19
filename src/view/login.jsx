import React, { useCallback, useState, useEffect, useRef } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
// import {  } from "react-router-dom";
import Captcha from "react-captcha-code";
// import axios from "axios";
import { adminlogin } from "../server/index";
import { gethealthlist } from "../server/index";
const title = {
  margin: "0 auto 30px auto",
  textAlign: "center",
  color: "#707070"
};

function Login(props) {
  // const [content, setContent] = useState("初始状态");
  const useStateRef = useRef(0);

  console.log(props);

  useEffect(() => {}, []);
  const [messageApi, contextHolder] = message.useMessage();
  const info = () => {
    messageApi.info("账号密码错误");
  };
  const yanzhens = () => {
    messageApi.info("验证码错误");
  };
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    let data = {
      username: values.username,
      password: values.password
    };
    adminlogin(data).then((res) => {
      console.log("token", res.data.data);
      window.localStorage.setItem("Token", res.data.data);
      gethealthlist().then((res) => {
        props.fn(res.data.data);
      });
    });
    if (values.username === "admin" && values.password === "123456") {
      if (values.yanzhen === useStateRef.current) {
        let data = {
          username: values.username,
          password: values.password
        };
        adminlogin(data).then((res) => {
          console.log("token", res.data.data);
          window.localStorage.setItem("Token", res.data.data);
          gethealthlist().then((res) => {
            props.fn(res.data.data);
          });
        });
      } else {
        yanzhens();
      }
    } else {
      info();
    }
  };
  const handleClick = useCallback((captcha) => {
    console.log("captcha:", captcha);
    useStateRef.current = captcha;
    console.log(useStateRef.current);
  }, []);
  return (
    <div
      className="App bg-center flex justify-center items-center"
      style={{
        backgroundImage: `url("https://pe.xzzl120.com/admin/static/img/bg.3d9a89e4.jpg")`,
        height: "100vh"
      }}
    >
      <div className="w-[350px] h-[365px] p-[20px] bg-white rounded-md">
        {contextHolder}
        <h3 style={title} className="text-xl font-bold">
          {" "}
          西藏阜康肿瘤医院 管理系统
        </h3>
        <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: "Please input your Username!" }]} validateTrigger="onBlur">
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item name="yanzhen" rules={[{ required: true, message: "验证码" }]}>
            <div className=" flex justify-between ">
              <Input className="mr-[20px]" prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="验证码" />
              <Captcha charNum={4} onChange={handleClick} />;
            </div>
          </Form.Item>
          <Form.Item className="myinput">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住密码</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button className="flex justify-center items-center w-[100%] p-[10px] bg-sky-500" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
