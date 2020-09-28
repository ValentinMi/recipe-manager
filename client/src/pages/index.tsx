import { Flex, Heading } from "@chakra-ui/core";
import React from "react";

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  return (
    <Flex w="100%" align="center" justify="center">
      <Heading>Welcome to Recipe Manager</Heading>
    </Flex>
  );
};

export default Index;
