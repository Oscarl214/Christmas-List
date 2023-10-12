import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class FamilyMember {
  @Field(() => ID)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  image: string;

  @Field(() => [String])
  list: string[];
}
