import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  ingredients: Array<Ingredient>;
  post?: Maybe<Ingredient>;
  recipes: Array<Recipe>;
  recipe?: Maybe<Recipe>;
};


export type QueryPostArgs = {
  id: Scalars['Float'];
};


export type QueryRecipeArgs = {
  id: Scalars['Float'];
};

export type Ingredient = {
  __typename?: 'Ingredient';
  id: Scalars['Float'];
  name: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Recipe = {
  __typename?: 'Recipe';
  id: Scalars['Float'];
  title: Scalars['String'];
  description: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createIngredient: Ingredient;
  updateIngredient?: Maybe<Ingredient>;
  deleteIngredient: Scalars['Boolean'];
  createRecipe: Recipe;
  updateRecipe?: Maybe<Recipe>;
  deleteRecipe: Scalars['Boolean'];
};


export type MutationCreateIngredientArgs = {
  input: IngredientInput;
};


export type MutationUpdateIngredientArgs = {
  input?: Maybe<IngredientInput>;
  id: Scalars['Float'];
};


export type MutationDeleteIngredientArgs = {
  id: Scalars['Float'];
};


export type MutationCreateRecipeArgs = {
  input: RecipeInput;
};


export type MutationUpdateRecipeArgs = {
  input?: Maybe<RecipeInput>;
  id: Scalars['Float'];
};


export type MutationDeleteRecipeArgs = {
  id: Scalars['Float'];
};

export type IngredientInput = {
  name: Scalars['String'];
};

export type RecipeInput = {
  title: Scalars['String'];
  description: Scalars['String'];
};

export type IngredientsQueryVariables = Exact<{ [key: string]: never; }>;


export type IngredientsQuery = (
  { __typename?: 'Query' }
  & { ingredients: Array<(
    { __typename?: 'Ingredient' }
    & Pick<Ingredient, 'id' | 'name'>
  )> }
);


export const IngredientsDocument = gql`
    query Ingredients {
  ingredients {
    id
    name
  }
}
    `;

/**
 * __useIngredientsQuery__
 *
 * To run a query within a React component, call `useIngredientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useIngredientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIngredientsQuery({
 *   variables: {
 *   },
 * });
 */
export function useIngredientsQuery(baseOptions?: Apollo.QueryHookOptions<IngredientsQuery, IngredientsQueryVariables>) {
        return Apollo.useQuery<IngredientsQuery, IngredientsQueryVariables>(IngredientsDocument, baseOptions);
      }
export function useIngredientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IngredientsQuery, IngredientsQueryVariables>) {
          return Apollo.useLazyQuery<IngredientsQuery, IngredientsQueryVariables>(IngredientsDocument, baseOptions);
        }
export type IngredientsQueryHookResult = ReturnType<typeof useIngredientsQuery>;
export type IngredientsLazyQueryHookResult = ReturnType<typeof useIngredientsLazyQuery>;
export type IngredientsQueryResult = Apollo.QueryResult<IngredientsQuery, IngredientsQueryVariables>;