import { Button, Form, Input, Typography, message } from "antd";
import React from "react";
import { useMutation } from "react-query";
import { UserService } from "../services/user.services";
import { PASSWORD_REGEX, PASSWORD_REGEX_MESSAGE } from "../Utils/Constant";

const { Title } = Typography;

function Register() {
  const [messageApi, contextHolder] = message.useMessage();
  const { mutateAsync: registerRequest, isLoading: registerRequestLoader } =
    useMutation("register", (payload) => UserService.register(payload));

  const onFinish = (value) => {
    // console.log(value, "value");
    registerRequest(value, {
      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "User is registered successfully.",
        });
        form.resetFields();
      },
    });
  };
  const [form] = Form.useForm();
  return (
    <div>
      {contextHolder}
      <Title level={2}>Register</Title>
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
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message:
                "Password should be contains at least one alphabet and contains at least one digit and is at least 8 characters",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input placeholder="Type your password" />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={registerRequestLoader}
        >
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;
