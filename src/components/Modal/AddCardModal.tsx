import { BasicModal } from "./BasicModal";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import * as React from "react";

export const AddCardModal = ({
  open,
  closeModal,
  isLoading,
  handleAddNewCard,
  emptyValueErrorText = "Value is required",
  fullWidth = false,
}: PropsType) => {
  const [qError, setQError] = useState(false);
  const [aError, setAError] = useState(false);
  const [format, setFormat] = useState("text");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const questionText = question.trim();
    const answerText = answer.trim();
    questionText ? setQError(false) : setQError(true);
    answerText ? setAError(false) : setAError(true);
  }, [question, answer]);

  const onFormatChange = (e: SelectChangeEvent) => {
    setFormat(e.target.value);
  };
  const onQuestionChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQError(false);
    setQuestion(e.currentTarget.value);
  };
  const onAnswerChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAError(false);
    setAnswer(e.currentTarget.value);
  };

  const onClickHandler = () => {
    if (question && answer) {
      const newQuestion = question.trim();
      const newAnswer = answer.trim();
      handleAddNewCard(newQuestion, newAnswer);
      setFormat("text");
      setQuestion("");
      setAnswer("");
    } else if (question && !answer) {
      setAError(true);
    } else if (!question && answer) {
      setQError(true);
    } else {
      setAError(true);
      setQError(true);
    }
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
      error={qError || aError}
      nameButton={"Save"}
    >
      <div>Choose a question format</div>
      <FormControl fullWidth size={"small"}>
        <Select value={format} onChange={onFormatChange}>
          <MenuItem value={"text"}>text</MenuItem>
          <MenuItem value={"img"}>img</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth={fullWidth}
        label={qError ? emptyValueErrorText : "question"}
        variant={"standard"}
        value={question}
        onKeyDown={handleKeyDown}
        onChange={onQuestionChange}
        error={qError}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <TextField
        fullWidth={fullWidth}
        label={aError ? emptyValueErrorText : "answer"}
        variant={"standard"}
        value={answer}
        onKeyDown={handleKeyDown}
        onChange={onAnswerChange}
        error={aError}
        style={{ width: "100%", marginBottom: "30px" }}
      />
    </BasicModal>
  );
};

type PropsType = {
  isLoading: boolean;
  handleAddNewCard: (question: string, answer: string) => Promise<void>;
  emptyValueErrorText?: string;
  fullWidth?: boolean;
  open: boolean;
  closeModal: () => void;
};
