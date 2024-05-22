import React from "react";
import classnames from "classnames";

interface IContentProps {
  children: React.ReactNode;
  className?: string;
}

const Content: React.FC<IContentProps> = ({ children, className }) => (
  <div className={classnames(className, 'px-8 lg:px-0 lg:max-w-screen-lg w-full mx-auto')}>
    {children}
  </div>
)

export default Content;