import { ReactFlowProvider } from "reactflow";
import ReactFlowContainer from "./ReactFlowContainer";
import { store } from "Objects/store";
import { Provider as ReduxProvider } from "react-redux";

const App = () => {
  return (
    <ReactFlowProvider>
      <ReduxProvider store={store}>
        <div className="main">
          <ReactFlowContainer />
        </div>
      </ReduxProvider>
    </ReactFlowProvider>
  );
};

export default App;
