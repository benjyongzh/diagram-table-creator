import React from "react";
import { Button } from "./button";

type ButtonStyledIconProps = {
  onButtonClick?: Function;
  children: React.ReactNode;
  className?: string;
};

const ButtonStyledIcon = (props: ButtonStyledIconProps) => {
  const { onButtonClick, children, className } = props;

  const handleClick = () => {
    if (onButtonClick) onButtonClick();
  };

  return (
    <Button
      onClick={handleClick}
      size="icon"
      variant="ghost"
      className={`menu-text-low-contrast hover:bg-transparent dark:hover:bg-transparent hover:text-sky-500 dark:hover:text-sky-500 aspect-square rounded-full ${
        className ? className : ""
      }`}
    >
      {children}
    </Button>
  );
};

export default ButtonStyledIcon;
