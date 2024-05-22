import React from "react";
import { Button } from "./button";

type ButtonStyledIconProps = {
  onButtonClick?: Function;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
};

const ButtonStyledIcon = (props: ButtonStyledIconProps) => {
  const { onButtonClick, children, className, type } = props;

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
      type={type ? type : "button"}
    >
      {children}
    </Button>
  );
};

export default ButtonStyledIcon;
