import React from "react";
import { helperService } from "../../Utils/helper";
import { Link } from "react-router-dom";
import { UNAUTHENTICATED_ROUTES } from "../../Utils/Constant";

function SinglePost({ singlePost }) {
  return (
    <>
      <h2>
        <Link
          to={UNAUTHENTICATED_ROUTES.POST_DETAIL.replace(
            ":postId",
            singlePost?.id
          )}
        >
          {singlePost?.post_title}
        </Link>
      </h2>
      <p className="lead">
        by <a href="index.php">{singlePost?.post_author}</a>
      </p>
      <p>
        <span className="glyphicon glyphicon-time"></span> Posted on{" "}
        {helperService.convertDateToOurFormate(singlePost?.post_date)}
      </p>
      <hr />
      <Link
        to={UNAUTHENTICATED_ROUTES?.POST_DETAIL.replace(
          ":postId",
          singlePost?.id
        )}
      >
        {singlePost?.image ? (
          <img src={singlePost?.image} />
        ) : (
          <img
            className="img-responsive"
            src="http://placehold.it/900x300"
            alt=""
          />
        )}
      </Link>
      <hr />
      <p>{singlePost?.post_content}</p>
      <Link
        className="btn btn-primary"
        to={UNAUTHENTICATED_ROUTES.POST_DETAIL.replace(
          ":postId",
          singlePost?.id
        )}
      >
        Read More <span className="glyphicon glyphicon-chevron-right"></span>
      </Link>

      <hr />
    </>
  );
}

export default SinglePost;
