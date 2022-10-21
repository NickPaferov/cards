import React, { ChangeEvent, FC, useCallback, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import { FormControl, IconButton, TextField } from "@mui/material";

type EditableSpanType = {
  title: string;
  changeTitle: (title: string) => void;
};

export const EditableSpan: FC<EditableSpanType> = React.memo(
  ({ title, changeTitle }) => {
    const [userText, setUserText] = useState<string>("");
    const [editMode, setEditMode] = useState<boolean>(false);
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      setUserText(e.currentTarget.value);
    }, []);

    const onEditMode = useCallback(() => {
      setEditMode(true);
      setUserText(title);
    }, [title]);
    const offEditMode = useCallback(() => {
      title !== userText && changeTitle(userText);
      setEditMode(false);
    }, [changeTitle, userText]);

    return editMode ? (
      <h3>
        <FormControl>
          <TextField
            id={"standard-error-helper-text"}
            style={{ maxWidth: "300px" }}
            value={userText}
            variant="standard"
            autoFocus={true}
            onChange={onChangeHandler}
            onBlur={offEditMode}
          />
        </FormControl>
        <IconButton
          onClick={offEditMode}
          color="primary"
          aria-label="add to shopping cart"
        >
          <CreateIcon fontSize={"small"} color={"disabled"} />
        </IconButton>
      </h3>
    ) : (
      <h3>
        <span onDoubleClick={onEditMode}>{title}</span>
        <IconButton
          onClick={onEditMode}
          color="primary"
          aria-label="add to shopping cart"
        >
          <CreateIcon fontSize={"small"} color={"disabled"} />
        </IconButton>
      </h3>
    );
  }
);
