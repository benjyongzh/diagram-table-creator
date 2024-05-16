import { Modal } from "./Modal";
import { RowItemWithTitleDescContent } from "./RowItemWithTitleDescContent";
import { Switch } from "./ui/switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./providers/ThemeProvider";
import featureFlags from "Configs/featureFlags";

export const ModalSettings = () => {
  const { theme, setTheme } = useTheme();

  const handleSetTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <Modal title="Settings" width={540}>
      <div className="flex flex-col gap-7">
        {featureFlags.CAN_SET_THEME && (
          <RowItemWithTitleDescContent
            title="Display Theme"
            description="Toggle between light and dark theme"
          >
            <div className="flex items-center justify-between gap-2">
              <Sun className="h-6 w-6 transition-all scale-110 dark:scale-90 fill-slate-900 stroke-slate-900 dark:fill-none dark:stroke-slate-600" />
              <Switch
                checked={theme === "dark"}
                onCheckedChange={handleSetTheme}
                className="data-[state=unchecked]:bg-slate-300"
              ></Switch>
              <Moon className="h-6 w-6 transition-all scale-90 dark:scale-110 fill-none stroke-slate-300 dark:fill-slate-100 dark:stroke-slate-100" />
            </div>
          </RowItemWithTitleDescContent>
        )}
        {featureFlags.CAN_SET_SAVE_FOLDER && (
          <RowItemWithTitleDescContent
            title="Save/Load"
            description="Set folder here"
          >
            <span>placeholder</span>
          </RowItemWithTitleDescContent>
        )}
      </div>
    </Modal>
  );
};
