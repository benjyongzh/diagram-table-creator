import { ReactFlowProvider } from "reactflow";
import ReactFlowContainer from "./ReactFlowContainer";
import { store } from "Objects/store";
import { Provider as ReduxProvider } from "react-redux";
import { Sidebar } from "./Sidebar";
import { ThemeProvider } from "./providers/ThemeProvider";

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
