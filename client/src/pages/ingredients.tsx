import { Flex, Grid } from "@chakra-ui/core";
import React from "react";
import Ingredient from "../components/Ingredient";
import Spinner from "../components/Spinner";
import { useIngredientsQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

interface IngredientsProps {}

const Ingredients: React.FC<IngredientsProps> = ({}) => {
  const { data, loading } = useIngredientsQuery();

  return (
    <Flex w="100%" align="center" justify="center" p={6}>
      {loading ? (
        <Spinner />
      ) : (
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          {data?.ingredients.map((ingr, i) => (
            <Ingredient key={`${ingr}:${i}`} name={ingr.name} />
          ))}
        </Grid>
      )}
    </Flex>
  );
};

export default withApollo({ ssr: false })(Ingredients);
