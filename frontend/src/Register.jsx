import {
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
  Card,
  CardBody,
} from "reactstrap";
import { useState } from "react";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || email.length === 0) {
      alert("Email is required");
      return;
    }
    if (!password || password.length === 0) {
      alert("Password is required");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/register/", {
        email,
        password,
      });
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        alert("Register successful");
        window.location.href = "/";
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("Error in register", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1>User Registration</h1>
      <Card
        style={{
          width: "60%",
        }}
      >
        <CardBody>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="exampleEmail">Email address</Label>
              <Input
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormText color="muted">
                We'll never share your email with anyone else.
              </FormText>
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>

            <Button color="primary" type="submit">
              Submit
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default Register;
