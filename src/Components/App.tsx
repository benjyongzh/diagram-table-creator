import { ReactFlowProvider } from "reactflow";
import ReactFlowContainer from "./ReactFlowContainer";
import { store } from "Objects/store";
import { Provider as ReduxProvider } from "react-redux";
import { Sidebar } from "./Sidebar";

const App = () => {
  return (
    <ReactFlowProvider>
      <ReduxProvider store={store}>
        <div className="main">
          <Sidebar />
          <ReactFlowContainer />
        </div>
      </ReduxProvider>
    </ReactFlowProvider>
  );
};

export default App;
