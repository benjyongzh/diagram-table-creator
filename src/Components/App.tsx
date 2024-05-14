import { ReactFlowProvider } from "reactflow";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "Objects/store";
import { ThemeProvider } from "./providers/ThemeProvider";
import ReactFlowContainer from "./ReactFlowContainer";
import { Sidebar } from "./Sidebar";

const App = () => {
  return (
    <ReactFlowProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ReduxProvider store={store}>
          <div className="main">
            <Sidebar />
            <ReactFlowContainer />
          </div>
        </ReduxProvider>
      </ThemeProvider>
    </ReactFlowProvider>
  );
};

export default App;
