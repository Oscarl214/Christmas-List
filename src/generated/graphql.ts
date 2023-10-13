import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FamilyMember = {
  __typename?: 'FamilyMember';
  description: Scalars['String'];
  image: Scalars['String'];
  info: Scalars['String'];
  list: Array<Scalars['String']>;
  name: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  FamilyMember?: Maybe<FamilyMember>;
  family: Array<FamilyMember>;
};


export type QueryFamilyMemberArgs = {
  name: Scalars['String'];
};

export type MemberByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type MemberByNameQuery = { __typename?: 'Query', FamilyMember?: { __typename?: 'FamilyMember', name: string, description: string, list: Array<string>, image: string, info: string } | null };

export type GetMemberQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMemberQuery = { __typename?: 'Query', family: Array<{ __typename?: 'FamilyMember', name: string, list: Array<string>, image: string, description: string }> };


export const MemberByNameDocument = gql`
    query memberByName($name: String!) {
  FamilyMember(name: $name) {
    name
    description
    list
    image
    info
  }
}
    `;
export const GetMemberDocument = gql`
    query getMember {
  family {
    name
    list
    image
    description
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    memberByName(variables: MemberByNameQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MemberByNameQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MemberByNameQuery>(MemberByNameDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'memberByName', 'query');
    },
    getMember(variables?: GetMemberQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetMemberQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMemberQuery>(GetMemberDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMember', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;