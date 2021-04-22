import React, { useEffect } from "react";
import { List } from "semantic-ui-react";

import avatars from "../assets/icons/avatars/avatarIcons";
import CommentObject from "./CommentObject";

const CommentsList = ({ auth, comments, onCommentCreate, onDeleteClick }) => {
  useEffect(() => {}, [auth]);

  const renderCommentsHeader = () => {
    switch (comments.length) {
      case 0:
        return "No comments";
      case 1:
        return "1 comment";
      default:
        return `${comments.length} comments`;
    }
  };

  const renderComments = () => {
    if (comments) {
      return comments.map((comment) => {
        const idx = Math.floor(Math.random() * avatars.length);
        const avatar = avatars.find((a) => avatars.indexOf(a) === idx);
        const slug = comment.user.username.split(" ").join("");
        return (
          <CommentObject
            key={comment.id}
            comment={comment}
            avatar={avatar}
            slug={slug}
            onCommentCreate={onCommentCreate}
            onDeleteClick={onDeleteClick}
          />
        );
      });
    }
  };

  return (
    <>
      <h3 className="pl-md-5 pl-0" style={{ marginLeft: "32px" }}>
        {renderCommentsHeader()}
      </h3>
      <List divided relaxed>
        {renderComments()}
      </List>
    </>
  );
};

export default CommentsList;
