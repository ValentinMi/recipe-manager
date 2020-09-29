import {
  Ingredient,
  validateIngredient as validate
} from "../entities/Ingredient";
import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver
} from "type-graphql";
import { getConnection } from "typeorm";

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
class PaginatedIngredients {
  @Field(() => [Ingredient])
  ingredients: Ingredient[];
  @Field()
  hasMore: boolean;
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
  @Query(() => PaginatedIngredients)
  async ingredients(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedIngredients> {
    // 20 -> 21
    const realLimit = Math.min(50, limit);
    const reaLimitPlusOne = realLimit + 1;
    const qb = getConnection()
      .getRepository(Ingredient)
      .createQueryBuilder("p")
      .orderBy('"createdAt"', "DESC")
      .take(reaLimitPlusOne);

    if (cursor) {
      qb.where('"createdAt" < :cursor', {
        cursor: new Date(parseInt(cursor))
      });
    }

    const ingredients = await qb.getMany();

    return {
      ingredients: ingredients.slice(0, realLimit),
      hasMore: ingredients.length === reaLimitPlusOne
    };
  }

  // Read one
  @Query(() => Ingredient, { nullable: true })
  ingredient(@Arg("id") id: number): Promise<Ingredient | undefined> {
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
