import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import Index from "./view/index";
import Home from "./view/system/user/index";
import About from "./view/system/role";
let Layout = lazy(() => import("./view/Layout"));

let router = [
  {
    path: "/index",
    element: <Index />
  }
];
if (window.localStorage.getItem("routex")) {
  let data = JSON.parse(window.localStorage.getItem("routex"));
  console.log(data);
  // router = [
  //   {
  //     path: "/index",
  //     element: <Index />,
  //     children: [
  //       {
  //         path: "system",
  //         element:<Layout/> ,
  //         children: [
  //           {
  //             path: "user",
  //             element: <Home />
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // ];

  function getRoute(data) {
    console.log(data.length);
    let children = [];
    for (let i = 0; i < data.length; i++) {
      let path = null;
      let component = `./view/${data[i].component}`;
      console.log(component, data[i].component);
      data[i].path[0] === "/" ? (path = data[i].path.slice(1)) : (path = data[i].path);
      const Homes = lazy(() => import(`./view/${data[i].component}`));
      let obj;
      if (data[i].children) {
        obj = {
          path: path,
          element: <Homes />,
          children: getRoute(data[i].children)
        };
      } else {
        obj = {
          path: path,
          element: <Homes />
        };
      }

      children.push(obj);
    }
    return children;
  }

  router[0].children = getRoute(data);
  console.log(router);
  // console.log(getRoute(data));
}
export default router;
