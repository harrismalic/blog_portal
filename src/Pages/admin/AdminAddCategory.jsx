import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useMutation, useQueries, useQuery } from "react-query";
import { CategoryService } from "../../services/categories.services";
import { useNavigate, useParams } from "react-router-dom";
import { AUTHENTICATED_ROUTE } from "../../Utils/Constant";

const AdminAddCategory = () => {
  const { catId } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { mutateAsync: addCategoryRequest, isLoading: addCategoryLoder } =
    useMutation("addCategory", (payload) =>
      CategoryService.addCategory(payload)
    );
  const { mutateAsync: updateCategoryRequest, isLoading: updateCategoryLoder } =
    useMutation(["editCategory", catId], (payload) =>
      CategoryService.updateCategoryById(catId, payload)
    );
  const { data: editCategoryData, isLoading: editCategoryLoder } = useQuery(
    ["editCategory", catId],
    () => CategoryService.getCategoryById(catId),
    {
      enabled: Boolean(catId),
    }
  );

  useEffect(() => {
    if (editCategoryData?.data?.results) {
      form.setFieldsValue({
        cat_title: editCategoryData?.data?.results?.cat_title,
      });
    }
  }, [editCategoryData?.data?.results]);

  const onFinish = (values) => {
    if (catId) {
      updateCategoryRequest(values, {
        onSuccess: () => {
          messageApi.open({
            type: "success",
            content: "Category is Added Sucessfully.",
          });
          form.resetFields();
          setTimeout(() => {
            navigate(AUTHENTICATED_ROUTE.CATEGORIES);
          }, 1000);
        },
      });
    } else {
      addCategoryRequest(values, {
        onSuccess: () => {
          messageApi.open({
            type: "success",
            content: "Category is Added Sucessfully.",
          });
          form.resetFields();
          setTimeout(() => {
            navigate(AUTHENTICATED_ROUTE.CATEGORIES);
          }, 1000);
        },
      });
    }
  };

  return (
    <Form onFinish={onFinish} autoComplete="off" form={form}>
      {contextHolder}
      <h2>{catId ? "Edit" : "Add"} Category</h2>
      <Form.Item
        name="cat_title"
        rules={[
          {
            required: true,
            message: "Please input your category title",
          },
        ]}
      >
        <Input placeholder="Category title" />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        loading={addCategoryLoder || editCategoryLoder || updateCategoryLoder}
      >
        {catId ? "Update" : "Add"} Category
      </Button>
    </Form>
  );
};
export default AdminAddCategory;
