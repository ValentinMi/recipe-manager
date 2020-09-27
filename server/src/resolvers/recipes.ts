import { Recipe, validateRecipe as validate } from "../entities/Recipe";
import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver
} from "type-graphql";

@InputType()
export class RecipeInput {
  @Field()
  title!: string;

  @Field()
  description!: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class RecipeResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Recipe, { nullable: true })
  recipe?: Recipe;
}

@Resolver()
export class RecipeResolver {
  // QUERY

  // Read
  @Query(() => [Recipe])
  async recipes(): Promise<Recipe[]> {
    return Recipe.find();
  }

  // Read one
  @Query(() => Recipe, { nullable: true })
  recipe(@Arg("id") id: number): Promise<Recipe | undefined> {
    return Recipe.findOne(id);
  }

  // MUTATION

  // Create
  @Mutation(() => Recipe)
  async createRecipe(
    @Arg("input") input: RecipeInput
  ): Promise<Recipe | RecipeResponse> {
    const { error } = validate(input);
    if (error)
      return {
        errors: [
          {
            field: "",
            message: error.message
          }
        ]
      };

    const newRecipe = await Recipe.create(input).save();
    return newRecipe;
  }

  // Update
  @Mutation(() => Recipe, { nullable: true })
  async updateRecipe(
    @Arg("id") id: number,
    @Arg("input", () => RecipeInput, { nullable: true }) input: RecipeInput
  ): Promise<RecipeResponse> {
    const { error } = validate(input);
    if (error)
      return {
        errors: [
          {
            field: "",
            message: error.message
          }
        ]
      };

    const recipe = await Recipe.findOne(id);
    if (!recipe)
      return {
        errors: [
          {
            field: "name",
            message: "Recipe not found"
          }
        ]
      };

    await Recipe.update({ id }, input);

    return { recipe };
  }

  // Delete
  @Mutation(() => Boolean)
  async deleteRecipe(@Arg("id") id: number): Promise<boolean> {
    await Recipe.delete(id);
    return true;
  }
}
