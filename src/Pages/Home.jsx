import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { postService } from "../services/post.service";
import { helperService } from "../Utils/helper";
import SinglePost from "../components/singlepost/SinglePost";
// import { useMatch } from "react-router-dom";

function Home() {
  const { data: postData, isLoading: postLoder } = useQuery("posts", () =>
    postService.getPost()
  );

  const posts = useMemo(
    () => postData?.data?.results,
    [postData?.data?.results]
  );

  // console.log(postData?.data?.results, "postData");

  if (postLoder) {
    return <h2>Loading....</h2>;
  }

  return (
    <div>
      <h1 className="page-header">Blog Post</h1>

      {/* <!-- First Blog Post --> */}

      {posts?.length > 0 ? (
        posts.map((singlePost) => {
          return <SinglePost singlePost={singlePost} />;
        })
      ) : (
        <h2>No Post Found</h2>
      )}
    </div>
  );
}

export default Home;
