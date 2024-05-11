import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { CategoryService } from "../services/categories.services";
import SinglePost from "../components/singlepost/SinglePost";
import { Spin } from "antd";

function CategoryDetail() {
  const { catid } = useParams();
  const { data: categoryDataById, isLoading: catLoding } = useQuery(
    ["categoryById", catid],
    () => CategoryService.getCategoryById(catid),
    { enabled: Boolean(catid) }
  );
  const singleCategoryData = categoryDataById?.data?.results;
  //   console.log(categoryDataById?.data?.results, "categoryDataById");
  return (
    <Spin spinning={catLoding}>
      <h2>Category Detail</h2>
      {singleCategoryData?.posts?.length > 0
        ? singleCategoryData?.posts?.map((singlePost) => {
            return <SinglePost singlePost={singlePost} />;
          })
        : !catLoding && <h2>No Post Found</h2>}
    </Spin>
  );
}

export default CategoryDetail;
