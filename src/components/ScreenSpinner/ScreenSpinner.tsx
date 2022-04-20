import * as React from "react";
import Spinner, { SpinnerProps } from "../Spinner/Spinner";
import { PopoutWrapper } from "../PopoutWrapper/PopoutWrapper";
import { getClassName } from "../../helpers/getClassName";
import { usePlatform } from "../../hooks/usePlatform";
import { useScroll } from "../AppRoot/ScrollContext";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import "./ScreenSpinner.css";

export type ScreenSpinnerProps = React.HTMLAttributes<HTMLDivElement> &
  SpinnerProps;

const ScreenSpinner: React.FC<ScreenSpinnerProps> = (
  props: ScreenSpinnerProps
) => {
  const { style, className, ...restProps } = props;
  const platform = usePlatform();

  const { enableScrollLock, disableScrollLock } = useScroll();
  useIsomorphicLayoutEffect(() => {
    enableScrollLock();
    return () => disableScrollLock();
  }, [enableScrollLock, disableScrollLock]);

  return (
    <PopoutWrapper
      hasMask={false}
      vkuiClass={getClassName("ScreenSpinner", platform)}
      className={className}
      style={style}
    >
      <div vkuiClass="ScreenSpinner__container">
        <Spinner vkuiClass="ScreenSpinner__spinner" {...restProps} />
      </div>
    </PopoutWrapper>
  );
};

ScreenSpinner.defaultProps = {
  size: "large",
  "aria-label": "Пожалуйста, подождите...",
};

// eslint-disable-next-line import/no-default-export
export default ScreenSpinner;
