// Button is a new style of button added to Donut in Nov 2019. It should
// be used instead of the Button component.
// TODO: Eventually all buttons should be moved over to use this component and
// it should simply be renamed to Button.
import React from "react";
import {
  StyledButton,
  StyledButtonPrefix,
  StyledButtonSuffix,
  Loading,
} from "./styles";

const Button = React.forwardRef(function DonutButton(
  { children, loading, disabled, prefix, suffix, size, ...props },
  ref,
) {
  return (
    <StyledButton
      ref={ref}
      aria-label={children}
      data-loading={loading}
      disabled={loading || disabled}
      buttonSize={size}
      {...props}
    >
      {loading && <Loading />}
      {prefix && <StyledButtonPrefix>{prefix}</StyledButtonPrefix>}
      {children}
      {suffix && <StyledButtonSuffix>{suffix}</StyledButtonSuffix>}
    </StyledButton>
  );
});

Button.defaultProps = {
  size: "m",
  variant: "primary",
};

export default Button;
