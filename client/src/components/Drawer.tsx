import {
  Drawer as ChakraDrawer,
  Flex,
  IconButton,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  Button,
  DrawerFooter,
  useDisclosure,
  Box
} from "@chakra-ui/core";
import React, { useRef } from "react";
import Link from "next/link";

// LINKS
const links = [
  { href: "/", label: "Welcome" },
  { href: "/recipes", label: "Recipes" },
  { href: "/ingredients", label: "Ingredients" }
];

interface DrawerProps {}

const Drawer: React.FC<DrawerProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <Box zIndex={10}>
      {/* CLOSE */}
      <Flex
        bg="green.400"
        width="6vh"
        height="100vh"
        justify="center"
        position="fixed"
      >
        <IconButton
          mt={3}
          aria-label="Open menu"
          icon="chevron-right"
          onClick={onOpen}
          border="none"
          background="none"
          color="white"
          size="lg"
          _hover={{ backgroundColor: "green.200", color: "black" }}
        />
      </Flex>

      {/* OPEN */}
      <ChakraDrawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef.current}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Stack spacing={6} mt={3}>
              {links.map(l => (
                <Box key={`link:${l.label}`} my={3}>
                  <Link href={l.href}>
                    <Button w="100%" variantColor="green">
                      {l.label}
                    </Button>
                  </Link>
                </Box>
              ))}
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </ChakraDrawer>
    </Box>
  );
};

export default Drawer;
