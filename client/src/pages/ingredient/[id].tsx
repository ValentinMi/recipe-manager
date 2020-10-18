import React from "react";
import { Layout } from "../../components/Layout";
import { Heading, Box } from "@chakra-ui/core";
import { useGetIngredientFromUrl } from "../../utils/useGetIngredientFromUrl";
// import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { withApollo } from "../../utils/withApollo";

const Ingredient = ({}) => {
  const { data, error, loading } = useGetIngredientFromUrl();

  if (loading) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data?.ingredient) {
    return (
      <Layout>
        <Box>could not find ingredient</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading mb={4}>{data.ingredient.title}</Heading>
      <Box mb={4}>{data.ingredient.text}</Box>
      {/* <EditDeleteingredientButtons
        id={data.ingredient.id}
        creatorId={data.ingredient.creator.id}
      /> */}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Ingredient);
