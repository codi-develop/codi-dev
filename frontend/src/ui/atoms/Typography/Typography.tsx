import styled from "@emotion/styled";
import { Typography } from "../../ui";
import theme from "../../theme";

const Typography = ({
  variant,
  size,
  color,
  weight,
  align,
  children,
  ...restStyles
}: Typography) => {
  const StyledTypography = styled
    .div(() => ({
      minWidth: "fit-content",
      fontSize: size ?? "18px",
      color: color ?? theme.colors.black,
      textAlign: align ?? "left",
      height: "fit-content",
      fontWeight: weight,
      wordBreak: "break-word",
      ...restStyles,
    }))
    .withComponent(variant);
  return <StyledTypography>{children}</StyledTypography>;
};

export default Typography;
