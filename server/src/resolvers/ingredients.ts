import {
  Ingredient,
  validateIngredient as validate
} from "../entities/Ingredient";
import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver
} from "type-graphql";

// TYPES

@InputType()
export class IngredientInput {
  @Field()
  name!: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class IngredientResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Ingredient, { nullable: true })
  ingredient?: Ingredient;
}

@Resolver()
export class IngredientResolver {
  // QUERY

  // Read
  @Query(() => [Ingredient])
  async ingredients(): Promise<Ingredient[]> {
    return Ingredient.find();
  }

  // Read one
  @Query(() => Ingredient, { nullable: true })
  post(@Arg("id") id: number): Promise<Ingredient | undefined> {
    return Ingredient.findOne(id);
  }

  // MUTATION

  // Create
  @Mutation(() => Ingredient)
  async createIngredient(
    @Arg("input") input: IngredientInput
  ): Promise<IngredientResponse> {
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

    const ingredient = await Ingredient.findOne({ name: input.name });
    if (ingredient)
      return {
        errors: [
          {
            field: "name",
            message: "This ingredient already exists"
          }
        ]
      };

    const newIngredient = await Ingredient.create(input).save();
    return { ingredient: newIngredient };
  }

  // Update
  @Mutation(() => Ingredient, { nullable: true })
  async updateIngredient(
    @Arg("id") id: number,
    @Arg("input", () => IngredientInput, { nullable: true })
    input: IngredientInput
  ): Promise<IngredientResponse> {
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

    const ingredient = await Ingredient.findOne(id);
    if (!ingredient)
      return {
        errors: [
          {
            field: "name",
            message: "Ingredient not found"
          }
        ]
      };

    await Ingredient.update({ id }, input);

    return { ingredient };
  }

  // Delete
  @Mutation(() => Boolean)
  async deleteIngredient(@Arg("id") id: number): Promise<boolean> {
    await Ingredient.delete(id);
    return true;
  }
}
