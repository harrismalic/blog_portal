import { Button, Modal, Table, message } from "antd";
import React from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "react-query";
import { CategoryService } from "../../services/categories.services";
import { helperService } from "../../Utils/helper";
import { useNavigate } from "react-router-dom";
import { AUTHENTICATED_ROUTE } from "../../Utils/Constant";

const { confirm } = Modal;

function AdminCategories() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const {
    data,
    isLoading,
    isFetching,
    refetch: reloadCategories,
  } = useQuery("admincategories", () => CategoryService.getCategory());

  const { mutateAsync: categoryDeleteRequest, isLoading: categoryDeleteLoder } =
    useMutation("deleteCategory", (catId) =>
      CategoryService.deleteCategoryById(catId)
    );

  const deleteCategoryBtnHandler = (row) => {
    const catId = row?.cat_id;
    confirm({
      title: "Do you want to delete this category ? ",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        categoryDeleteRequest(catId, {
          onSuccess: () => {
            messageApi.open({
              type: "success",
              content: "Category is deleted Sucessfully.",
            });
            reloadCategories();
          },
        });
      },
    });
  };

  const columns = [
    {
      title: "Cat Id",
      dataIndex: "cat_id",
      key: "catId",
    },
    {
      title: "Name",
      dataIndex: "cat_title",
      key: "name",
    },
    {
      title: "Created At",
      key: "CreatedAt",
      render: (row) => {
        return helperService.convertDateToOurFormate(row?.created_at);
      },
    },
    {
      title: "Updated At",
      key: "UpdatedAt",
      render: (row) => {
        return helperService.convertDateToOurFormate(row?.updated_at);
      },
    },

    {
      title: "Edit",
      key: "edit",
      render: (row) => {
        return (
          <Button
            type="primary"
            onClick={() => {
              navigate(
                AUTHENTICATED_ROUTE.EDIT_CATEGORY.replace(":catId", row?.cat_id)
              );
            }}
          >
            Edit
          </Button>
        );
      },
    },
    {
      title: "Delete",
      key: "delete",
      render: (row) => {
        return (
          <Button
            type="primary"
            danger
            onClick={() => deleteCategoryBtnHandler(row)}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      {contextHolder}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Categories</h2>
        <Button
          type="primary"
          ghost
          onClick={() => navigate(AUTHENTICATED_ROUTE.ADD_CATEGORY)}
        >
          Add Category
        </Button>
      </div>
      <Table
        dataSource={data?.data?.results}
        columns={columns}
        loading={isLoading || isFetching || categoryDeleteLoder}
      />
      ;
    </div>
  );
}

export default AdminCategories;
