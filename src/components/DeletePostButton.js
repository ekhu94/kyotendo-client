import React from "react";
import { Button } from "semantic-ui-react";
import "./DeletePostButton.css";

const DeletePostButton = ({ onPostDeleteClick }) => {
  const onDeleteClick = () => {
    onPostDeleteClick();
  };

  return (
    <Button
      className="delete-btn"
      size="mini"
      color="red"
      content="delete post"
      icon="delete"
      labelPosition="right"
      onClick={onDeleteClick}
    />
  );
};

export default DeletePostButton;
