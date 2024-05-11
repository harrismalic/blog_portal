import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { postService } from "../services/post.service";
import { Spin, message } from "antd";
import { helperService } from "../Utils/helper";
import { UNAUTHENTICATED_ROUTES } from "../Utils/Constant";
import { commentService } from "../services/comment.service";

function PostDetail() {
  const { postId } = useParams();

  const [comments, setComments] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const { mutateAsync: commentRequest, isLoading: commentRequestLoading } =
    useMutation(["storeComments", postId], (payload) =>
      commentService.storeComment(payload)
    );

  const commentsChangeHandler = (event) => {
    event.preventDefault();
    setComments(event.target.value);
  };

  const commentSubmitHandler = (e) => {
    e.preventDefault();
    const payload = {
      comment_content: comments,
      post_id: postId,
    };
    commentRequest(payload, {
      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "Comment added sucessfully but approval is required",
        });
        setComments("");
      },
    });
  };

  const { data: postDetailData, isLoading: postDetailLoading } = useQuery(
    ["postDetail", postId],
    () => postService?.getPostById(postId),
    {
      enabled: Boolean(postId),
    }
  );
  const postDetailDataExact = postDetailData?.data?.results;
  return (
    <Spin spinning={postDetailLoading}>
      {contextHolder}
      {/* <!-- Blog Post --> */}

      {/* <!-- Title --> */}
      <h2>Post Detail</h2>
      <h1>{postDetailDataExact?.post_title}</h1>

      {/* <!-- Author --> */}
      <p class="lead">
        by <a href="#">{postDetailDataExact?.post_author}</a>
      </p>

      <hr />

      {/* <!-- Date/Time --> */}
      <p>
        <span class="glyphicon glyphicon-time"></span> Posted on{" "}
        {helperService.convertDateToOurFormate(postDetailDataExact?.post_date)}
      </p>

      <hr />

      {/* <!-- Preview Image --> */}
      <Link
        to={UNAUTHENTICATED_ROUTES?.POST_DETAIL.replace(
          ":postId",
          postDetailDataExact?.id
        )}
      >
        {postDetailDataExact?.image ? (
          <img src={postDetailDataExact?.image} />
        ) : (
          <img
            className="img-responsive"
            src="http://placehold.it/900x300"
            alt=""
          />
        )}
      </Link>

      <hr />

      {/* <!-- Post Content --> */}
      <p class="lead">{postDetailDataExact?.post_content}</p>

      <hr />

      {/* <!-- Blog Comments --> */}

      {/* <!-- Comments Form --> */}
      <div class="well">
        <h4>Leave a Comment:</h4>
        <form role="form" onSubmit={commentSubmitHandler}>
          <div class="form-group">
            <textarea
              class="form-control"
              rows="3"
              onChange={commentsChangeHandler}
              value={comments}
            ></textarea>
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            disabled={!Boolean(comments) || commentRequestLoading}
          >
            Submit
          </button>
        </form>
      </div>

      <hr />
    </Spin>
  );
}

export default PostDetail;
