import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
  Container,
  Select,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_REACT_APP_BACKEND_URL + "/user/getUserProfile",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setName(res.data?.body?.name);
        setEmail(res.data?.body?.email);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (values) => {
    setLoading(true);
    console.log(values);
    // event.preventDefault()
    axios
      .post(
        import.meta.env.VITE_REACT_APP_BACKEND_URL + "/user/addSystemFeedback",
        // {
        //   feedbackType: feedbackType,
        //   feedback: feedback,
        // },
        values,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res?.data?.success === true) {
          showNotification({
            title: "Feedback Sent",
            feedback: "Your feedback has been sent!",
            color: "green",
            icon: <IconCheck size={14} />,
            autoClose: true,
          });
          form.reset();
        } else {
          showNotification({
            title: "Feedback Sending Failed",
            feedback: "Please try again.",
            color: "red",
            icon: <IconX size={14} />,
            autoClose: true,
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const form = useForm({
    initialValues: { feedback: "", feedbackType: "" },

    // functions will be used to validate values at corresponding key
    validate: {
      feedback: (value) =>
        value.length < 10 ? "Message must have at least 10 letters" : null,
      feedbackType: (value) =>
        !value ? "Please select a feedback type" : null,
    },
  });

  const [loading, setLoading] = useState(false);

  return (
    <Container size={"xl"} mt={"xl"}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Title order={2} size="h1" weight={800} align="center">
          Get in touch
        </Title>

        <Stack spacing={"md"}>
          <TextInput
            label="Name"
            placeholder="Your name"
            name="name"
            variant="filled"
            styles={{ input: { border: "1px solid #a7a7a8" } }}
            size="md"
            readOnly
            value={name}
            // required
          />
          <TextInput
            label="Email"
            placeholder="Your email"
            name="email"
            variant="filled"
            styles={{ input: { border: "1px solid #a7a7a8" } }}
            size="md"
            readOnly
            value={email}
            // required
          />

          <Select
            label="Select feedback type"
            placeholder="Pick one"
            data={[
              { value: "feedback", label: "Feedback" },
              { value: "complaint", label: "Complaint" },
              { value: "suggestion", label: "Suggestion" },
            ]}
            styles={{
              input: { border: "1px solid #a7a7a8" },
            }}
            size="md"
            variant="filled"
            // value={feedbackType}
            // onChange={setType}
            // required
            {...form.getInputProps("feedbackType")}
          />
          <Textarea
            label="Message"
            placeholder="Your feedback"
            maxRows={10}
            minRows={5}
            autosize
            name="feedback"
            variant="filled"
            styles={{ input: { border: "1px solid #a7a7a8" } }}
            // value={feedback}
            // onChange={(e) => setMessage(e.target.value)}
            size="md"
            // required
            {...form.getInputProps("feedback")}
          />
        </Stack>

        <Group position="center" mt="xl">
          <Button
            // feedbackType="submit"
            size="md"
            color="red"
            loading={loading}
            type="submit"
          >
            Send feedback
          </Button>
        </Group>
      </form>
    </Container>
  );
}
