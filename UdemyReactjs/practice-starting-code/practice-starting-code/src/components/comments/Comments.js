import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/hooks/use-http";
import { getAllComments } from "../../lib/lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./Comments.module.css";
import CommentsList from "./CommentsList";
import NewCommentForm from "./NewCommentForm";

const Comments = () => {
  const params = useParams();
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);
  useEffect(() => {
    sendRequest(params.quoteId);
  }, [params.quoteId, sendRequest]);
  let comments;
  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = (
      <div className="centered">
        {" "}
        <CommentsList comments={loadedComments} />{" "}
      </div>
    );
  }
  if (
    status === "completed" &&
    !loadedComments &&
    loadedComments.length === 0
  ) {
    comments = (
      <div className="centered">
        <p>Not comments added</p>{" "}
      </div>
    );
  }

  const startAddCommentHandler = (data) => {
    setIsAddingComment(true);
  };
  const addCommentHandler = useCallback(() => {
    sendRequest(params.quoteId);
  }, [params, params.quoteId]);

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          onAddedComment={addCommentHandler}
          quoteId={params.quoteId}
        />
      )}
      {comments}{" "}
    </section>
  );
};

export default Comments;
