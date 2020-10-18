import { Flex, Grid } from "@chakra-ui/core";
import React, { useState } from "react";
import Ingredient from "../components/Ingredient";
import { Layout } from "../components/Layout";
import Spinner from "../components/Spinner";
import { useIngredientsQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

interface IngredientsProps {}

const Ingredients: React.FC<IngredientsProps> = ({}) => {
  const [variables, setVariables] = useState({
    limit: 33,
    cursor: null as null | string
  });
  const { data, loading } = useIngredientsQuery({ variables });
  console.log(data);

  return (
    <Layout>
      <Flex w="100%" align="center" justify="center" p={6}>
        {loading ? (
          <Spinner />
        ) : (
          <Grid
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
              "repeat(5, 1fr)"
            ]}
            gap={6}
          >
            {data?.ingredients.ingredients.map((ingr, i) => (
              <Ingredient key={`${ingr}:${i}`} name={ingr.name} />
            ))}
          </Grid>
        )}
      </Flex>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Ingredients);
