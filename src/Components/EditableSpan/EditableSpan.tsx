import React, { FC, useCallback, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import { IconButton } from "@mui/material";
import { Input } from "../Input/Input";

type EditableSpanType = {
  title: string;
  changeTitle: (title: string) => void;
};

export const EditableSpan: FC<EditableSpanType> = React.memo(
  ({ title, changeTitle }) => {
    console.log(title);
    const [userText, setUserText] = useState<string>(title);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [error, setError] = useState(false);

    const addItem = () => {
      if (userText.trim() !== "") {
        changeTitle(userText.trim());
        if (error) setError(false);
      } else {
        if (!error) setError(true);
      }
    };
    const onEditMode = useCallback(() => {
      setEditMode(true);
      setUserText(title);
    }, [title]);

    const offEditMode = useCallback(() => {
      if (userText == "") {
        setError(error);
      } else {
        setEditMode(false);
        addItem();
      }
    }, [changeTitle, userText]);

    return editMode ? (
      <h3>
        <Input
          title={userText}
          setTitle={setUserText}
          callBackHandlerForAddItem={addItem}
          error={error}
          id={"standard-error-helper-text"}
          label={error ? "Error" : "Required"}
          helperText={error ? "Title is required" : "Input title"}
          setError={setError}
          disabled={error}
        />
        {/*<TextField*/}
        {/*    id={"standard-error-helper-text"}*/}
        {/*    // error={error}*/}
        {/*    style={{maxWidth: '600px'}}*/}
        {/*    label={error ? 'Error' : 'Required'}*/}
        {/*    helperText={error ? 'Name is required' : 'Input name'}*/}
        {/*    value={userText}*/}
        {/*    variant="standard"*/}
        {/*    autoFocus={true}*/}
        {/*    onKeyPress={onKeyPressHandler}*/}
        {/*    onChange={ onChangeHandler }*/}
        {/*    // onBlur={offEditMode}*/}
        {/*    color={'secondary'}*/}
        {/*/>*/}
        <IconButton
          onClick={offEditMode}
          disabled={error}
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
