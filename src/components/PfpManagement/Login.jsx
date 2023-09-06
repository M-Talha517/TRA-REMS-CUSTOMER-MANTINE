import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Divider,
  Modal,
  Code,
  Stack,
} from "@mantine/core";
import {
  IconAt,
  IconBrandFacebook,
  IconBrandGoogle,
  IconCheck,
  IconX,
} from "@tabler/icons";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const [routerHistory, setRouterHistory] = useState([]);
  const [loggingInAs, setLoggingInAs] = useState("");

  const from = location.state?.from || "/";

  useEffect(() => {
    setRouterHistory((routerHistory) => [...routerHistory, from]);
  }, [from]);

  const prevLocation = routerHistory[routerHistory.length - 1];

  const { setAuth } = useAuth();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) =>
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
          ? "Invalid email address"
          : null,
      password: (value) =>
        value?.length < 4 ? "Password must have at least 4 characters" : null,
    },
  });

  const handleSubmit = (values) => {
    setLoading(true);
    axios
      .post(
        import.meta.env.VITE_REACT_APP_BACKEND_URL + "/user/login",
        values,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response?.data);
        console.log(JSON.stringify(response));

        if (
          response?.data?.body?.userType === "agencyOwner" ||
          response?.data?.body?.userType === "agencyAgent" ||
          response?.data?.body?.userType === "admin"
        ) {
          setLoggingInAs(response?.data?.body?.userType);
          setOpened(true);
          setLoading(false);
          return;
        }
        const accessToken = response?.data?.token;
        localStorage.setItem("token", accessToken);
        console.log("====================================LoginCheckings");
        console.log(localStorage.getItem("token"));
        console.log(localStorage);
        console.log("====================================LoginChecking");
        setLoading(false);

        if (response?.data?.success === true) {
          showNotification({
            title: "Login Successful",
            message: "You have been successfully logged in!",
            color: "green",
            icon: <IconCheck size={14} />,
            autoClose: true,
          });
          setAuth({
            name: response.data.body?.name,
            email: response.data.body?.email,
            // password,
            accessToken,
          });
          navigate(prevLocation, { replace: true });
        } else {
          showNotification({
            title: "Login Failed",
            message: "Invalid Credentials",
            color: "red",
            icon: <IconX size={14} />,
            autoClose: true,
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("====================================");
        console.log(err);
        console.log("====================================");
        if (!err.response) {
          console.log("No response from the server");
          showNotification({
            title: "Login Failed",
            message: "No response from the server",
            color: "red",
            icon: <IconX size={14} />,
            autoClose: true,
          });
        } else if (err.response.status === 401) {
          console.log("Unauthorized");
          showNotification({
            title: "Login Failed",
            message: "Unauthorized",
            color: "red",
            icon: <IconX size={14} />,
            autoClose: true,
          });
        } else if (err.response.status === 400) {
          console.log("Missing Username or password");
          showNotification({
            title: "Login Failed",
            message: "Missing Username or password",
            color: "red",
            icon: <IconX size={14} />,
            autoClose: true,
          });
        } else {
          console.log("Something went wrong, Login Failed");
          showNotification({
            title: "Login Failed",
            message: "Something went wrong, Login Failed",
            color: "red",
            icon: <IconX size={14} />,
            autoClose: true,
          });
        }
      });
  };

  return (
    <Container size={420} my={40}>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Login Failed"
      >
        <Text>
          You are trying to login as an {loggingInAs}. To Login as an{" "}
          {loggingInAs} please visit the link below{" "}
          <Anchor
            href="https://tra-rems-admin-mui.vercel.app/"
            target="_blank"
            onClick={() => setOpened(false)}
          >
            <Text color="red" align="center">
              {loggingInAs} Login
            </Text>
          </Anchor>
        </Text>
      </Modal>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 700,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Link style={{ textDecoration: "none" }} to="/register">
          <Anchor
            href="#"
            size="sm"
            style={{ color: "#D92228", textDecoration: "none" }}
          >
            Create account
          </Anchor>
        </Link>
      </Text>

      <Paper
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        style={{ borderColor: "lightgrey" }}
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Stack spacing={"xl"}>
            <TextInput
              icon={<IconAt size={14} />}
              label="Email"
              placeholder="hello@gmail.com"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              {...form.getInputProps("password")}
            />
          </Stack>

          <Group position="apart" mt="lg">
            <Anchor
              onClick={() => {
                navigate("/forgotPassword");
              }}
              href="#"
              size="sm"
              style={{ color: "#D92228", textDecoration: "none" }}
            >
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" color="red" type="submit" loading={loading}>
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
