import { Box, Button, TextField } from "@mui/material";
import Form from "next/form";

export default function Page() {
  const handleLogin = async () => {
    "use server";
  };

  return (
    <Form action={handleLogin}>
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
        <TextField label="Username" id="username" variant="outlined" />
        <TextField
          label="Password"
          id="password"
          type="password"
          variant="outlined"
        />
        <Button type="submit">Login</Button>
      </Box>
    </Form>
  );
}
