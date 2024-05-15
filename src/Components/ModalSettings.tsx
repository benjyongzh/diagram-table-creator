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
          <RowItemWithTitleDescContent title="Theme" description="dark mode?">
            <Switch
              checked={theme === "dark"}
              onCheckedChange={handleSetTheme}
            />
          </RowItemWithTitleDescContent>
        )}

        <RowItemWithTitleDescContent
          title="Save/Load"
          description="Set folder here"
        >
          <span>hello</span>
        </RowItemWithTitleDescContent>
      </div>
    </Modal>
  );
};
