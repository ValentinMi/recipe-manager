import React from "react";
import { Spinner as ChakraSpinner } from "@chakra-ui/core";

interface SpinnerProps {}

const Spinner: React.FC<SpinnerProps> = ({}) => {
  return (
    <ChakraSpinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  );
};

export default Spinner;
