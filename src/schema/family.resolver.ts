import { Resolver, Query, Arg } from 'type-graphql';

import { FamilyMember } from './family';
import family from './family.json';

@Resolver(FamilyMember)
export class FamilyResolver {
  @Query(() => FamilyMember, { nullable: true })
  FamilyMember(
    @Arg('name', () => String) name: string
  ): FamilyMember | undefined {
    const familymember = family.find((member) => member.name === name);
    if (familymember === undefined) {
      throw new Error('FamilyMember not found');
    }
    return familymember;
  }

  @Query(() => [FamilyMember])
  family(): FamilyMember[] {
    return family;
  }
}
