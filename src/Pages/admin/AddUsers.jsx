import { Button, Form, Input, Typography, message } from "antd";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";

import {
  AUTHENTICATED_ROUTE,
  PASSWORD_REGEX,
  PASSWORD_REGEX_MESSAGE,
} from "../../Utils/Constant";
import { UserService } from "../../services/user.services";
import CustomUpload from "../../components/custom-upload/CustomUpload";
import { useNavigate, useParams } from "react-router-dom";

const { Title } = Typography;

function AddUsers() {
  const { userId } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [fileObject, setFileObject] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutateAsync: registerRequest, isLoading: registerRequestLoader } =
    useMutation("register", (payload) => UserService.addUserFormData(payload));

  const { mutateAsync: UpdateUserRequest, isLoading: UpdateUserLoader } =
    useMutation(["updateUser", userId], (payload) =>
      UserService.updateUserFormData(userId, payload)
    );

  const { data: editUserData, isLoading: editUserLoder } = useQuery(
    ["editData", userId],
    () => UserService.getUserById(userId),
    {
      enabled: Boolean(userId),
    }
  );
  const editData = editUserData?.data?.results;
  useEffect(() => {
    if (editUserData) {
      form.setFieldsValue({
        username: editData?.username,
        user_firstname: editData?.user_firstname,
        user_lastname: editData?.user_lastname,
        email: editData?.email,
        password: editData?.password,
        c_password: editData?.c_password,
      });
    }
  }, [editUserData]);
  const onFinish = (value) => {
    // console.log(value, "value");
    const payload = value;
    if (fileObject) {
      payload.user_image = fileObject;
    }
    const formData = new FormData();
    Object.keys(payload).map((singleKey) => {
      formData.append(singleKey, payload[singleKey]);
    });
    if (fileObject) {
      formData.append("user_image", fileObject);
    }

    if (userId) {
      UpdateUserRequest(formData, {
        onSuccess: () => {
          messageApi.open({
            type: "success",
            content: "User is Updated successfully.",
          });
          form.resetFields();
          setTimeout(() => {
            navigate(AUTHENTICATED_ROUTE.USERS);
          }, 1000);
        },
      });
    } else {
      registerRequest(formData, {
        onSuccess: () => {
          messageApi.open({
            type: "success",
            content: "User is created successfully.",
          });
          form.resetFields();
        },
      });
    }
  };

  const customRequestCallback = (binaryFileObject) => {
    setFileObject(binaryFileObject);
  };
  return (
    <div>
      {contextHolder}
      <Title level={2}>{userId ? "Edit" : "Add"} User </Title>
      <Form name="basic" onFinish={onFinish} autoComplete="off" form={form}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username",
            },
          ]}
        >
          <Input placeholder="Type your username" />
        </Form.Item>

        <Form.Item
          name="user_firstname"
          rules={[
            {
              required: true,
              message: "Please input your firstname",
            },
          ]}
        >
          <Input placeholder="Type your firstname" />
        </Form.Item>

        <Form.Item
          name="user_lastname"
          rules={[
            {
              required: true,
              message: "Please input your lastname",
            },
          ]}
        >
          <Input placeholder="Type your lastname" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email",
            },
            {
              type: "email",
              message: "Please enter valid email",
            },
          ]}
        >
          <Input placeholder="Type your email" />
        </Form.Item>

        {!userId && (
          <>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password",
                },
                {
                  pattern: PASSWORD_REGEX,
                  message: PASSWORD_REGEX_MESSAGE,
                },
              ]}
            >
              <Input placeholder="Type your password" />
            </Form.Item>
            <Form.Item
              name="c_password"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please input your password",
                },
                {
                  pattern: PASSWORD_REGEX,
                  message: PASSWORD_REGEX_MESSAGE,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input placeholder="Type your password" />
            </Form.Item>
          </>
        )}

        <div style={{ marginTop: 10, marginBottom: 20 }}>
          <CustomUpload customRequestCallback={customRequestCallback} />
        </div>
        <div style={{ marginBottom: 20 }}>
          {editData?.user_image && (
            <img src={editData?.user_image} width="100" />
          )}
        </div>
        <Button
          type="primary"
          htmlType="submit"
          loading={registerRequestLoader || editUserLoder || UpdateUserLoader}
        >
          {userId ? "Edit" : "Add"} User
        </Button>
      </Form>
    </div>
  );
}

export default AddUsers;
