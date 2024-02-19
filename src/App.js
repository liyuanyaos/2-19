import React, { lazy, useRef, Suspense, useState } from "react";
import "./App.css";
import { Route, useRoutes, Routes, useNavigate } from "react-router-dom";
import Logins from "./view/login";

import myrouter from './router'
function App() {
  const navigate = useNavigate();
  function navigateTo(path) {
    navigate(path);
  }
  let routers = useRoutes(myrouter);
  // const Homes = () => import("./view/system/user/index");
  // let routes = useRoutes([
  //   {
  //     path: "/index",
  //     element: <Index />,
  //     children: [
  //       {
  //         path: "system",
  //         element: <Layout />,
  //         children: [
  //           {
  //             path: "user",
  //             element: <Home />
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // ]);
  
  const Fn = (data) => {
    console.log("我是父组件", data);
    // setShow([
    //   {
    //     path: "/index",
    //     element: <Index />,
    //     children: [
    //       {
    //         path: "system",
    //         element: <Layout />,
    //         children: [
    //           {
    //             path: "user",
    //             element: <Home />
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // ]);

    navigateTo("/index");
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Logins fn={Fn} />}></Route>
      </Routes>
      <Suspense>
        <div>{routers}</div>
      </Suspense>
      {/* {isShow && <div>我是条件渲染的数据</div>}
      <button onClick={handleClick}>点击切换</button> */}
    </>
    // <Routes>
    //   <Route path="/" element={<Logins />}></Route>
    //   <Route path="/index" element={<Index />}>
    //     <Route path="home" element={<Home></Home>}></Route>
    //     <Route path="about" element={<About></About>}></Route>
    //     <Route path="three" element={<Three></Three>}></Route>
    //     {/* <routes></routes> */}
    //   </Route>
    // </Routes>
    // <div>{routes}</div>
  );
}

export default App;
