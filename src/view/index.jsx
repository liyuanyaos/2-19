import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet, useRoutes, Link, useNavigate } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined, CloseOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme, Breadcrumb } from "antd";
import { gethealthlist } from "../server/index";
import store from "../store";
import { useDispatch, useSelector } from "react-redux";
// import About from "./view/a1/index2";
// import Three from "./view/a1/index3";
const { Header, Sider, Content } = Layout;
function Index(props) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [selectM, setselectM] = useState(['{"name":"role","title":"角色管理"}']);
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();
  const [imgs, setImgs] = useState("");
  const dispatch = useDispatch();
  const newState = useSelector((state) => state);
  const { arr, Tabarr } = store.getState().cart;
  console.log(Tabarr,arr);
  useEffect(() => {
    function fors(arr, path) {
      console.log(arr, path);
      let arrs = [];
      if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].children) {
            let obj = {
              key: JSON.stringify({ name: arr[i].name, title: arr[i].meta.title }),
              label: arr[i].meta.title,
              component: arr[i].component,
              children: fors(arr[i].children, arr[i].name)
            };
            arrs.push(obj);
          } else {
            // console.log(arr[i].name, arr[i].meta.title);
            let str = arr[i].name[0] === "/" ? "/index/" + path + arr[i].name : "/index/" + path + "/" + arr[i].name;
            let obj = {
              key: JSON.stringify({ name: arr[i].name, title: arr[i].meta.title }),
              label: <Link to={str}>{arr[i].meta.title}</Link>,
              component: arr[i].component,
              title: arr[i].name
            };
            arrs.push(obj);
          }
        }
      }

      return arrs;
    }
    function getdata() {
      gethealthlist()
        .then((res) => {
          console.log(res.data.data);
          window.localStorage.setItem("routex", JSON.stringify(res.data.data));
          setImgs(fors(JSON.parse(window.localStorage.getItem("routex"))));
          console.log("imgs", fors(res.data.data));
          window.localStorage.setItem("routex", JSON.stringify(res.data.data));
        })
        .catch((err) => {
          setImgs(fors(JSON.parse(window.localStorage.getItem("routex"))));
        });
    }
    getdata();
  }, []);
  // let arr = [{
  //   title:'首页'
  // }]
  function fn(e) {
    let newarr = [];
    let TabAddress = [];
    console.log(e);
    setselectM([e.key]);
    e.keyPath.forEach((v) => {
      newarr.push({ title: JSON.parse(v).title });
      TabAddress.push(JSON.parse(v).name);
    });
    let TabAdditem = "/index/" + TabAddress.reverse().join("/");
    TabAdditem = TabAdditem.replace("//", "/");
    // <div className="w-[8vw] ml-1 h-[5vh] text-lm flex justify-center items-center bg-lime-300">部门管理</div>
    console.log(TabAdditem);
    console.log(newarr);

    store.dispatch({ type: "PLUS", arr: newarr.reverse() });
    console.log(JSON.stringify(Tabarr));
    let flag = false;
    for (let i = 0; i < Tabarr.length; i++) {
      // console.log(Tabarr[i].title,newarr[0].title);
      if (Tabarr[i].title === newarr.at(-1).title) {
        flag = true;
      }
    }
    if (flag) {
      console.log("路劲已经存在");
    } else {
      console.log("路劲未存在");
      Tabarr.push({ address: TabAdditem, title: newarr.at(-1).title, children: newarr[0] });
      store.dispatch({ type: "ADD_TABARR", Tabarr });
    }
    console.log(TabAdditem);
  }
  function Fnhref(a, b, c) {
    console.log(a, b, c);
    let obj = { name: a.split("/").at(-1), title: b };
    console.log(obj);
    if (obj.name === "log") {
      obj.name = "/job/log";
    }
    setselectM([JSON.stringify(obj)]);
    store.dispatch({ type: "PLUS", arr: [{ title: b }, { title: c }].reverse() });
  }
  //删除标签栏的方法
  const delTabarr = (deladdress) => {
    console.log(deladdress, 11111);
    let index = Tabarr.findIndex((v) => v.title === deladdress);
    Tabarr.splice(index, 1);
    store.dispatch({ type: "DEL_TABARR", Tabarr });
    if (index < Tabarr.length) {
      console.log([JSON.stringify({ name: Tabarr[index].address.split("/").at(-1), title: Tabarr[index].title })]);
      setselectM([JSON.stringify({ name: Tabarr[index].address.split("/").at(-1), title: Tabarr[index].title })]);
    } else {
      index = index - 1;
      if (index < 0) index = 0;
      setselectM([JSON.stringify({ name: Tabarr[0].address.split("/").at(-1), title: Tabarr[0].title })]);
    }

    // props.history.push(Tabarr[index].address)
    navigate(Tabarr[index].address);
    console.log(Tabarr);
  };
  return (
    <Layout className="h-[100vh]">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['{"name":"system","title":"系统管理"}']} selectedKeys={selectM} onSelect={fn} items={imgs}></Menu>
      </Sider>
      <Layout className="overflow-auto">
        <Content
          style={{
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG
          }}
        >
          <div className="flex items-center">
            <Header
              style={{
                padding: 0,
                background: colorBgContainer
              }}
            >
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64
                }}
              />
            </Header>
            <Breadcrumb items={arr} />
          </div>
          <header className="flex shadow-md px-2 pb-1">
            <div className="w-[5vw] h-[5vh] text-lm flex justify-center items-center bg-slate-100">首页</div>
            <div className="w-[8vw] ml-1 h-[5vh] text-lm flex justify-center items-center bg-lime-300">部门管理</div>
            {Tabarr.map((v, index) => (
              <div key={index} className="w-[8vw] ml-1 h-[5vh] text-lm flex justify-center items-center bg-lime-300">
                <Link to={v.address}>
                  <div onClick={() => Fnhref(v.address, v.title, v.children.title)}>{v.title}</div>
                </Link>
                <div
                  onClick={() => {
                    delTabarr(v.title);
                  }}
                  className=" ml-5"
                >
                  <CloseOutlined />
                </div>
              </div>
            ))}
          </header>
          {/* {newState} */}
          {/* {arrs} */}
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
}
export default Index;
