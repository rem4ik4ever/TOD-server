/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import { Context } from "./api/context"
import { core, connectionPluginCore } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
    /**
     * Adds a Relay-style connection to the type, with numerous options for configuration
     *
     * @see https://nexusjs.org/docs/plugins/connection
     */
    connectionField<FieldName extends string>(
      fieldName: FieldName,
      config: connectionPluginCore.ConnectionFieldConfig<TypeName, FieldName>
    ): void
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CreateEmailTemplateInput: { // input type
    name: string; // String!
    template: string; // String!
  }
  CreateSubscriptionInput: { // input type
    checkoutSessionId: string; // String!
  }
  LoginUserInput: { // input type
    email: string; // String!
    password: string; // String!
  }
  RegisterUserInput: { // input type
    email: string; // String!
    password: string; // String!
    username: string; // String!
  }
  UpdateEmailTemplateInput: { // input type
    name: string; // String!
    template: string; // String!
  }
}

export interface NexusGenEnums {
  SubscriptionType: "ANNUAL" | "MONTHLY"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  AuthType: { // root type
    token?: string | null; // String
    user?: NexusGenRootTypes['User'] | null; // User
  }
  EmailTemplate: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id?: string | null; // ID
    name?: string | null; // String
    ownerId?: string | null; // String
    template?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Mutation: {};
  Query: {};
  Subscription: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id?: string | null; // String
    price: number; // Int!
    type: NexusGenEnums['SubscriptionType']; // SubscriptionType!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    userId: string; // String!
  }
  User: { // root type
    confirmed: boolean; // Boolean!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    id?: string | null; // String
    subscription?: NexusGenRootTypes['Subscription'] | null; // Subscription
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    username: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  AuthType: { // field return type
    token: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
  }
  EmailTemplate: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: string | null; // ID
    name: string | null; // String
    owner: NexusGenRootTypes['User'] | null; // User
    ownerId: string | null; // String
    template: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Mutation: { // field return type
    confirmEmail: NexusGenRootTypes['User'] | null; // User
    createEmailTemplate: NexusGenRootTypes['EmailTemplate'] | null; // EmailTemplate
    createSubscription: NexusGenRootTypes['User'] | null; // User
    createSubscriptionCheckoutSession: string | null; // String
    login: NexusGenRootTypes['User'] | null; // User
    logout: boolean | null; // Boolean
    ping: string; // String!
    register: NexusGenRootTypes['User'] | null; // User
    updateEmailTemplate: NexusGenRootTypes['EmailTemplate'] | null; // EmailTemplate
  }
  Query: { // field return type
    emailTemplate: NexusGenRootTypes['EmailTemplate'] | null; // EmailTemplate
    emailTemplates: Array<NexusGenRootTypes['EmailTemplate'] | null>; // [EmailTemplate]!
    me: NexusGenRootTypes['User'] | null; // User
    ok: boolean; // Boolean!
  }
  Subscription: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string | null; // String
    price: number; // Int!
    type: NexusGenEnums['SubscriptionType']; // SubscriptionType!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    userId: string; // String!
  }
  User: { // field return type
    confirmed: boolean; // Boolean!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    id: string | null; // String
    subscription: NexusGenRootTypes['Subscription'] | null; // Subscription
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    username: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  AuthType: { // field return type name
    token: 'String'
    user: 'User'
  }
  EmailTemplate: { // field return type name
    createdAt: 'DateTime'
    id: 'ID'
    name: 'String'
    owner: 'User'
    ownerId: 'String'
    template: 'String'
    updatedAt: 'DateTime'
  }
  Mutation: { // field return type name
    confirmEmail: 'User'
    createEmailTemplate: 'EmailTemplate'
    createSubscription: 'User'
    createSubscriptionCheckoutSession: 'String'
    login: 'User'
    logout: 'Boolean'
    ping: 'String'
    register: 'User'
    updateEmailTemplate: 'EmailTemplate'
  }
  Query: { // field return type name
    emailTemplate: 'EmailTemplate'
    emailTemplates: 'EmailTemplate'
    me: 'User'
    ok: 'Boolean'
  }
  Subscription: { // field return type name
    createdAt: 'DateTime'
    id: 'String'
    price: 'Int'
    type: 'SubscriptionType'
    updatedAt: 'DateTime'
    userId: 'String'
  }
  User: { // field return type name
    confirmed: 'Boolean'
    createdAt: 'DateTime'
    email: 'String'
    id: 'String'
    subscription: 'Subscription'
    updatedAt: 'DateTime'
    username: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    confirmEmail: { // args
      token: string; // String!
    }
    createEmailTemplate: { // args
      input: NexusGenInputs['CreateEmailTemplateInput']; // CreateEmailTemplateInput!
    }
    createSubscription: { // args
      input: NexusGenInputs['CreateSubscriptionInput']; // CreateSubscriptionInput!
    }
    login: { // args
      input: NexusGenInputs['LoginUserInput']; // LoginUserInput!
    }
    ping: { // args
      text: string; // String!
    }
    register: { // args
      input: NexusGenInputs['RegisterUserInput']; // RegisterUserInput!
    }
    updateEmailTemplate: { // args
      id: string; // ID!
      input: NexusGenInputs['UpdateEmailTemplateInput']; // UpdateEmailTemplateInput!
    }
  }
  Query: {
    emailTemplate: { // args
      id: string; // ID!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}