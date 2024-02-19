import { Outlet } from "react-router-dom";

function App(){
    return (<div>
        {/* 我是layout页面 */}
        <Outlet></Outlet>
    </div>)
}

export default App