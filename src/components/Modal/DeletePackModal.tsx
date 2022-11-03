import { BasicModal } from "./BasicModal";
import { useEffect, useState } from "react";
import * as React from "react";

export const DeletePackModal = ({
  open,
  cardsCount,
  closeModal,
  isLoading,
  handleDeletePack,
  initialValue,
}: PropsType) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleButtonClick = () => {
    handleDeletePack();
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
        {cardsCount > 0 && (
          <div style={{ marginTop: "5px" }}>
            All ({cardsCount}) cards will be deleted.
          </div>
        )}
      </div>
    </BasicModal>
  );
};

type PropsType = {
  initialValue: string;
  cardsCount: number;
  isLoading: boolean;
  handleDeletePack: () => Promise<void>;
  open: boolean;
  closeModal: () => void;
};
