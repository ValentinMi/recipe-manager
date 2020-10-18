import React from "react";
import { Wrapper, WrapperVariant } from "./Wrapper";
import { NavBar } from "./NavBar";
import { Box, Flex } from "@chakra-ui/core";
import Drawer from "../components/Drawer";

interface LayoutProps {
  variant?: WrapperVariant;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <Flex w="100%">
      <Drawer />
      <Box w="100%" ml="6vh">
        <NavBar />
        {children}
      </Box>
    </Flex>
  );
};
