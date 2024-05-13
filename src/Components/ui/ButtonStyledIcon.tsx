import { Button } from "./button";

const ButtonStyledIcon = ({
  children,
  onButtonClick,
}: {
  children: React.ReactNode;
  onButtonClick: Function;
}) => {
  return (
    <Button
      onClick={() => onButtonClick()}
      size="icon"
      variant="ghost"
      className="menu-text-low-contrast hover:bg-transparent dark:hover:bg-transparent hover:text-sky-600 dark:hover:text-sky-500 aspect-square rounded-full"
    >
      {children}
    </Button>
  );
};

export default ButtonStyledIcon;
