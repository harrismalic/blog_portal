import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { SearchService } from "../services/search.service";
import SinglePost from "../components/singlepost/SinglePost";
import { Spin } from "antd";

function SearchDetail() {
  const { query } = useParams();

  const { data: searchPostData, isLoading: searchLoader } = useQuery(
    ["search", query],
    () => SearchService.searchPost({ query_custom: query }),
    {
      enabled: Boolean(query),
    }
  );

  console.log(searchPostData, "searchPostData");

  const searchData = searchPostData?.data?.results;

  return (
    <Spin spinning={searchLoader}>
      <h2>Post Detail</h2>
      {searchData?.length > 0
        ? searchData?.map((singlePost) => {
            return <SinglePost singlePost={singlePost} />;
          })
        : !searchLoader && <h2>No Post Found!</h2>}
    </Spin>
  );
}

export default SearchDetail;
