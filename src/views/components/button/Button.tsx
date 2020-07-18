import React, { CSSProperties } from "react";
import "./Button.css";

type ButtonTypes = {
  type?:
    | "coral"
    | "slate-blue"
    | "green"
    | "tomato"
    | "dodger-blue"
    | "light-blue"
    | "sandy-brown"
    | "coral-outline";
  children: any;
  style?: CSSProperties;
  className?: string;
  onClick?: any;
};

const ButtonCstm = (props: ButtonTypes) => {
  let { type, children, style, className, onClick } = props;

  type = type || "coral";

  return (
    <div
      style={style}
      onClick={onClick}
      className={`custom-btn custom-btn-${type} ${className}`}
    >
      {children}
    </div>
  );
};

export default ButtonCstm;
