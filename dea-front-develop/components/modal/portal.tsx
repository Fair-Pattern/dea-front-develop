import ReactDOM from "react-dom";
import { useEffect, useRef } from "react";

type PortalProps = {
  children: React.ReactNode;
  className?: string;
};

const Portal = ({ children, className }: PortalProps) => {
  const bodyRef = useRef(document.getElementsByTagName(`body`)[0]);
  const elementRef = useRef(document.createElement(`div`));

  useEffect(() => {
    const element = elementRef.current;
    const portalRoot = bodyRef.current;

    element.className = "portal-root";

    if (className) {
      element.className = `${element.className} ${className}`;
    }

    portalRoot.appendChild(element);

    return () => {
      portalRoot.removeChild(element);
    };
  }, [className]);

  return ReactDOM.createPortal(children, elementRef.current);
};

export default Portal;
