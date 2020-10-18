import { Flex, Heading, Text } from "@chakra-ui/core";
import React from "react";
import { Layout } from "../components/Layout";
import { withApollo } from "../utils/withApollo";

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  return (
    <Layout>
      <Flex
        w="100%"
        direction="column"
        align="center"
        justify="center"
        h="100%"
      >
        <Heading as="h1" size="2xl">
          Welcome to Recipe Manager
        </Heading>
        <Text mt={10}>
          Recipe manager is an application who helps you to find some new idea
          in cooking
        </Text>
      </Flex>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
