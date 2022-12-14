import styled from "@emotion/styled";
import { WrapContainer } from "../../components/WrapContainer";
import { SetNewPasswordForm } from "./SetNewPasswordForm";

const Wrapper = styled.div`
  text-align: center;
`;

export const SetNewPasswordPage = () => {
  return (
    <WrapContainer>
      <Wrapper>
        <h1>Create new password</h1>
        <SetNewPasswordForm />
      </Wrapper>{" "}
    </WrapContainer>
  );
};
