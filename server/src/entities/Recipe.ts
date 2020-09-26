import Joi from "joi";
import { RecipeInput } from "../resolvers/recipes";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Ingredient } from "./Ingredient";

@ObjectType()
@Entity()
export class Recipe extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  description!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Ingredient)
  @JoinTable()
  categories: Ingredient[];
}

export const validateRecipe = (recipe: RecipeInput): Joi.ValidationResult => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(80).required(),
    description: Joi.string().min(30).max(10000).required()
  });

  return schema.validate(recipe);
};
