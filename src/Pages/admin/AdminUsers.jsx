import { Button, Modal, Table, message } from "antd";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { UserService } from "../../services/user.services";
import { helperService } from "../../Utils/helper";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AUTHENTICATED_ROUTE } from "../../Utils/Constant";

function AdminUsers() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const {
    data: usersData,
    isLoading: usersDataLoser,
    isFetching: userDataFetching,
    refetch: reloadUsers,
  } = useQuery("users", () => UserService.getUsers());
  const { mutateAsync: userDeleteRequest, isLoading: deleteUsersLoader } =
    useMutation("deleteUsers", (userId) => UserService.deleteUserById(userId));

  const deleteUsersBtnHandler = (row) => {
    Modal.confirm({
      title: "Do you want to delete this user",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        userDeleteRequest(row?.user_id, {
          onSuccess: () => {
            messageApi.open({
              type: "success",
              content: "User is deleted sucessfully.",
            });
            reloadUsers();
          },
        });
      },
    });
  };
  //   console.log(usersData?.data?.results, "usersData");

  //

  //   {
  //     "user_id": 36,
  //     "username": "Etha Hane 1",
  //     "user_firstname": "Dr. Edmond Stracke DVM 1",
  //     "user_lastname": "Kelly Nikolaus 1",
  //     "email": "purdy.izaiah1@example.com",
  //     "user_image": "https://via.placeholder.com/640x480.png/002266?text=dolorem",
  //     "user_role": "Subscriber",
  //     "token": "",
  //     "is_online": 0,
  //     "created_at": "2022-11-17T15:42:41.000000Z",
  //     "updated_at": "2024-05-06T11:32:18.000000Z"
  // }

  const columns = [
    {
      title: "Id",
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: "Users Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "First Name",
      dataIndex: "user_firstname",
      key: "user_firstname",
    },
    {
      title: "Last Name",
      dataIndex: "user_lastname",
      key: "user_lastname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Image",
      //   dataIndex: "user_image",
      key: "user_image",
      render: (row) => {
        if (!row?.user_image) {
          return "Image not found";
        }
        return <img src={row?.user_image} width="80" />;
      },
    },
    {
      title: "Role",
      dataIndex: "user_role",
      key: "user_role",
    },
    {
      title: "Created at",
      //   dataIndex: "created_at",
      key: "created_at",
      render: (row) => {
        return helperService.convertDateToOurFormate(row?.created_at);
      },
    },
    {
      title: "Updated at",
      //   dataIndex: "updated_at",
      key: "updated_at",
      render: (row) => {
        return helperService.convertDateToOurFormate(row?.updated_at);
      },
    },
    {
      title: "Edit",
      //   dataIndex: "created_at",
      key: "edit",
      render: (row) => {
        return (
          <Button
            type="primary"
            onClick={() =>
              navigate(
                AUTHENTICATED_ROUTE.EDIT_USER.replace(":userId", row?.user_id)
              )
            }
          >
            Edit
          </Button>
        );
      },
    },
    {
      title: "Delete",
      //   dataIndex: "created_at",
      key: "delete",
      render: (row) => {
        return (
          <Button
            type="primary"
            danger
            onClick={() => deleteUsersBtnHandler(row)}
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
        <h2>Users</h2>
        <Button
          type="primary"
          ghost
          onClick={() => navigate(AUTHENTICATED_ROUTE.ADD_USERS)}
        >
          Add Users
        </Button>
      </div>
      <Table
        dataSource={usersData?.data?.results}
        columns={columns}
        loading={usersDataLoser || userDataFetching || deleteUsersLoader}
      />
      ;
    </div>
  );
}

export default AdminUsers;
