import { ReactFlowProvider } from "reactflow";
import ReactFlowContainer from "./ReactFlowContainer";

const App = () => {
  return (
    <ReactFlowProvider>
      <div className="main">
        <ReactFlowContainer />
      </div>
    </ReactFlowProvider>
  );
};

export default App;
