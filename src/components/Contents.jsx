import React, { useEffect, useState } from "react";
import Header from "./Header";

import { Box, Textarea, Button, Tooltip, useToast } from "@chakra-ui/react";
import CreateNote from "./CreateNote";
import ListNote from "./ListNote";

function Contents() {
  return (
    <Box>
      <Header />
      <Box p={4} pt={125} display={{ md: "flex" }} h={"max-content"}>
        <CreateNote />
        <ListNote />
      </Box>
    </Box>
  );
}
export default Contents;
