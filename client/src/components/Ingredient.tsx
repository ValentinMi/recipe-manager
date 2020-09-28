import { Box, Image } from "@chakra-ui/core";
import React from "react";

interface IngredientProps {
  name: String;
}

const Ingredient: React.FC<IngredientProps> = ({ name }) => {
  return (
    <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden">
      <Image src={"https://picsum.photos/300/200"} alt={"aaaa"} />

      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {name}
        </Box>
      </Box>
    </Box>
  );
};

export default Ingredient;
