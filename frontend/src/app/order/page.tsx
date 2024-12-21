"use client"

import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

export default function Page() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateOrder = async () => {
    const request = {
      name: name,
      description: description,
    };

    const res = await fetch("api/orders", {
      body: JSON.stringify(request),
      method: "POST",
    });

    const data = await res.json();

    if (data.error) {
      console.log(data);
      return;
    }

    console.log(data);
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
          label="Name"
          id="name"
          variant="outlined"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          label="Description"
          id="description"
          variant="outlined"
          multiline
          maxRows={4}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <Button
          type="submit"
          onClick={handleCreateOrder}
          disabled={!name || !description}
        >
          Create Order
        </Button>
      </Box>
    </Box>
  );
}
