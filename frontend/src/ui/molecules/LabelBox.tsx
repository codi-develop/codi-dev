import { ReactNode } from "react";
import { FormLabel } from "../atoms/Label";
import styled from "@emotion/styled";
import { device } from "../theme";
import FlexBox from "../atoms/FlexBox";

const LabelBox = ({
  width,
  text,
  helpText,
  children,
  adorement,
}: {
  width?: string;
  text: string;
  helpText?: string;
  children?: ReactNode;
  adorement?: JSX.Element;
}) => {
  return (
    <StyledLabelBox>
      <FlexBox justifyContent="space-between">
        <FormLabel text={text} helpText={helpText} />
        {adorement}
      </FlexBox>

      {children}
    </StyledLabelBox>
  );
};

const StyledLabelBox = styled.div(({ width }: { width?: string }) => ({
  width: width ?? "100%",
  [device("tablet")]: {
    width: "100%",
  },
}));

export default LabelBox;
