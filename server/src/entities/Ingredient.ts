import Joi from "joi";
import { IngredientInput } from "src/resolvers/ingredients";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  //   ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@ObjectType()
@Entity()
export class Ingredient extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

export const validateIngredient = (
  ingredient: IngredientInput
): Joi.ValidationResult => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(80).required()
  });

  return schema.validate(ingredient);
};
