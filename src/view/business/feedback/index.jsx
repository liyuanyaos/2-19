import { Input,Button } from "antd";
function App() {
  return <div>
    <div className="xz_header flex">
        建议类容
        <Input></Input>
        <Button type="primary">提交</Button>
        <Button type="primary">重置</Button>
    </div>
    <div>
    <Button type="primary">删除</Button>
    </div>
  </div>;
}

export default App;
