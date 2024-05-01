import { ReactFlowProvider } from "reactflow";
import ReactFlowContainer from "./ReactFlowContainer";

const App = () => {
  return (
    <div className="providerflow">
      <ReactFlowProvider>
        <ReactFlowContainer />
      </ReactFlowProvider>
    </div>
  );
};

export default App;
