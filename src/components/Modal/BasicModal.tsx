import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { ReactNode } from "react";
import styled from "@emotion/styled";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BasicModal = ({
  children,
  isLoading,
  open,
  closeModal,
  buttonClick,
  error,
  nameButton,
}: PropsType) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={closeModal}
      >
        <Fade in={open}>
          <Box sx={style}>
            {children}
            <br></br>
            <ButtonContainer>
              <Button
                variant="outlined"
                disabled={isLoading}
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                disabled={isLoading || error}
                onClick={buttonClick}
              >
                {nameButton}
              </Button>
            </ButtonContainer>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

type PropsType = {
  children: ReactNode;
  isLoading: boolean;
  open: boolean;
  closeModal: () => void;
  buttonClick: () => void;
  error?: boolean;
  nameButton: string;
};
