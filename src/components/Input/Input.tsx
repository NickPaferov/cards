import { TextField } from "@material-ui/core";
import React, { KeyboardEvent, ChangeEvent, useCallback } from "react";

type InputType = {
  error?: boolean;
  id?: string;
  label?: string;
  helperText?: string;
  setError?: (value: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
  callBackHandlerForAddItem: () => void;
  disabled?: boolean;
};

export const Input = React.memo(
  ({
    title,
    setTitle,
    setError,
    callBackHandlerForAddItem,
    ...props
  }: InputType) => {
    const onChangeHandler = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        if (setError) {
          setError(false);
        }
      },
      [setError, setTitle]
    );

    const onKeyPressHandler = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          callBackHandlerForAddItem();
          setTitle(title);
        }
      },
      [callBackHandlerForAddItem, setTitle]
    );
    return (
      <TextField
        error={props.error}
        id={props.id}
        label={props.label}
        helperText={props.helperText}
        value={title}
        variant="standard"
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
      />
    );
  }
);