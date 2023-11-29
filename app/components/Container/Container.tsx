import React, { FC } from "react";
import style from "./Container.module.css";

type Props = {
  children: React.ReactNode;
};

export const Container: FC<Props> = ({ children }) => {
  return <div className={style.container}>{children}</div>;
};
