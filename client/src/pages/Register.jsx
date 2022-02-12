import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../services/auth";
import { useMessagesContext } from "../hooks/MessagesContext";
import { useAuth } from "../hooks/useAuth";

import { Box, Button, Container, Form, Heading, Icon } from "react-bulma-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'

export const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { addMessage } = useMessagesContext();
  const { logout } = useAuth();

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        addMessage(`Enter your email`);
        return;
      }
      if (!password) {
        addMessage(`Enter your password`);
        return;
      }
      const res = await Auth.register(email, password);

      if (res.error) {
        console.warn("Bad payload");
        addMessage(`ERROR: ${res.error}`);
        logout();
        return;
      }

      addMessage("Registration is succesfull. Now You can login using these credentials.");

      navigate("/login");

    }
    catch (err) {
      console.log({ err });
      addMessage(`ERROR: ${err}`);
      logout();
    }

  };

  return (
    <Container >
      <Heading>
        Registration form
      </Heading>
      <Heading subtitle>
        Please enter e-mail and password
      </Heading>

      <Box style={{ width: 400, margin: 'auto' }}
        as="form" onSubmit={handleSubmit}
      >
        <Form.Field>
          <Form.Label>Name</Form.Label>
          <Form.Control>
            <Form.Input
              placeholder="testas@testas.com"
              name="email"
              type="email"
              required
              value={email}
              onChange={onEmailChange}
            />
            <Icon align="left">
              <FontAwesomeIcon icon={faEnvelope} />
            </Icon>
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label>Password</Form.Label>
          <Form.Control>
            <Form.Input
              placeholder="Password"
              name="password"
              type="password"
              required
              minLength={8}
              onChange={onPasswordChange}
            />
            <Icon align="left">
              <FontAwesomeIcon icon={faLock} />
            </Icon>
          </Form.Control>
        </Form.Field>
        <Button.Group>
          <Button
            fullwidth
            rounded
            color="primary"
            type="submit"
            disabled={!email || !password}
            onClick={handleSubmit}
          >Register</Button>
        </Button.Group>
      </Box>

    </Container >
  );
};
