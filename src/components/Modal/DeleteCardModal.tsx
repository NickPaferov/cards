import { BasicModal } from "./BasicModal";
import { useEffect, useState } from "react";
import * as React from "react";

export const DeleteCardModal = ({
  open,
  closeModal,
  isLoading,
  handleDeleteCard,
  initialValue,
}: PropsType) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleButtonClick = () => {
    handleDeleteCard();
  };

  return (
    <BasicModal
      isLoading={isLoading}
      closeModal={closeModal}
      open={open}
      buttonClick={handleButtonClick}
      nameButton={"Delete"}
    >
      <div>
        Do you really want to remove
        <span> {value} </span>?
        {
          <div style={{ marginTop: "5px" }}>
            All progress in this card will be deleted.
          </div>
        }
      </div>
    </BasicModal>
  );
};

type PropsType = {
  initialValue: string;
  isLoading: boolean;
  handleDeleteCard: () => Promise<void>;
  open: boolean;
  closeModal: () => void;
};
