import { Button, Form, Input, Typography, message } from "antd";
import React from "react";
import { useMutation } from "react-query";
import { UserService } from "../services/user.services";
import {
  AUTHENTICATED_ROUTE,
  PASSWORD_REGEX,
  PASSWORD_REGEX_MESSAGE,
  UNAUTHENTICATED_ROUTES,
} from "../Utils/Constant";
import { AuthServices } from "../services/authService";

const { Title } = Typography;

function Login() {
  const [messageApi, contextHolder] = message.useMessage();
  const { mutateAsync: loginRequest, isLoading: loginRequestLoader } =
    useMutation("login", (payload) => UserService.login(payload));

  const onFinish = (value) => {
    // console.log(value, "value");
    loginRequest(value, {
      onSuccess: (data) => {
        // console.log(data?.data?.results, "data");
        messageApi.open({
          type: "success",
          content: "User is logged in successfully.",
        });
        form.resetFields();
        const apiResponse = data?.data?.results;
        AuthServices.saveToken(apiResponse?.token);
        AuthServices.saveUserName(apiResponse?.username);
        window.location.href = AUTHENTICATED_ROUTE.DASHBOARD;
      },
    });
  };
  const [form] = Form.useForm();
  return (
    <div>
      {contextHolder}
      <Title level={2}>Login</Title>
      <Form name="basic" onFinish={onFinish} autoComplete="off" form={form}>
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
          initialValue="oscar41@example.net"
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
          initialValue="admin123@"
        >
          <Input placeholder="Type your password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loginRequestLoader}>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
