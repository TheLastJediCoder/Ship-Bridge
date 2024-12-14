"use client";

import { Box, Button, TextField } from "@mui/material";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    sessionStorage.removeItem("token");

    const request = {
      username: username,
      password: password,
    };

    const res = await fetch("api/login", {
      body: JSON.stringify(request),
      method: "POST",
    });

    const data = await res.json();

    if (data.error) {
      console.log(data);
      return;
    }

    sessionStorage.setItem("token", data.token);
    redirect("/");
  };

  return (
    <Box>
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          display: "grid",
          gap: 2,
        }}
        mt="100px"
        maxWidth={"300px"}
      >
        <TextField
          label="Username"
          id="username"
          variant="outlined"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          label="Password"
          id="password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button
          type="submit"
          onClick={handleLogin}
          disabled={!username || !password}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}
