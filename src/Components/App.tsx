import { ReactFlowProvider } from "reactflow";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/Store/store";
import { ThemeProvider } from "./providers/ThemeProvider";
import ReactFlowContainer from "./ReactFlowContainer";
import { Sidebar } from "./Sidebar";
import { TooltipProvider } from "./ui/tooltip";
import { Toaster } from "./ui/sonner";

const App = () => {
  return (
    <ReactFlowProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ReduxProvider store={store}>
          <TooltipProvider>
            <div className="main">
              <Sidebar />
              <ReactFlowContainer />
              <Toaster expand={true} />
            </div>
          </TooltipProvider>
        </ReduxProvider>
      </ThemeProvider>
    </ReactFlowProvider>
  );
};

export default App;
