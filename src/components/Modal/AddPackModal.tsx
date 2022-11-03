import { BasicModal } from "./BasicModal";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import * as React from "react";

export const AddPackModal = ({
  open,
  closeModal,
  isLoading,
  handleAddNewPack,
  label,
  initialValue,
  buttonText = "save",
  emptyValueErrorText = "Value is required",
  fullWidth = false,
}: PropsType) => {
  const [value, setValue] = useState(initialValue);
  const [isPrivate, setIsPrivate] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const text = value.trim();
    text ? setError(false) : setError(true);
  }, [value]);

  const onClickHandler = () => {
    if (value) {
      const newName = value.trim();
      handleAddNewPack(newName, isPrivate);
      setValue("");
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setValue(value);
  };

  const onPrivateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPrivate(e.currentTarget.checked);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    e.code === "Enter" && onClickHandler();
  };

  const handleButtonClick = () => {
    onClickHandler();
  };

  return (
    <BasicModal
      isLoading={isLoading}
      closeModal={closeModal}
      open={open}
      buttonClick={handleButtonClick}
      error={error}
      nameButton={"Save"}
    >
      <TextField
        fullWidth={fullWidth}
        label={error ? emptyValueErrorText : label}
        value={value}
        error={error}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        variant="standard"
        autoFocus
        InputProps={{
          endAdornment: (
            <Button
              variant="contained"
              disabled={error || isLoading}
              sx={{
                borderRadius: "2px",
                fontSize: 12,
                fontWeight: 400,
                padding: "2px 10px",
                minWidth: 0,
                textTransform: "uppercase",
              }}
              onClick={handleButtonClick}
              startIcon={
                isLoading && (
                  <CircularProgress
                    size={12}
                    sx={{ color: "#ffffff", marginLeft: "8px" }}
                  />
                )
              }
            >
              {buttonText}
            </Button>
          ),
        }}
      />
      <FormControlLabel
        control={<Checkbox checked={isPrivate} onChange={onPrivateChange} />}
        label={"Private pack"}
        style={{ marginTop: "20px", marginBottom: "20px" }}
      />
    </BasicModal>
  );
};

type PropsType = {
  label: string;
  initialValue: string;
  isLoading: boolean;
  handleAddNewPack: (value: string, privateCard: boolean) => Promise<void>;
  buttonText?: string;
  emptyValueErrorText?: string;
  fullWidth?: boolean;
  open: boolean;
  closeModal: () => void;
};
