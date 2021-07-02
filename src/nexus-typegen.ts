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
  DataTableInput: { // input type
    name: string; // String!
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
  UpdateColumnInput: { // input type
    align?: string | null; // String
    field?: string | null; // String
    header?: string | null; // String
    hidden?: boolean | null; // Boolean
    minWidth?: number | null; // Int
    width?: string | null; // String
  }
}

export interface NexusGenEnums {
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
  Column: { // root type
    align: string; // String!
    field: string; // String!
    header: string; // String!
    hidden: boolean; // Boolean!
    id: string; // ID!
    minWidth?: number | null; // Int
    tableId: number; // Int!
    width: string; // String!
  }
  DataTable: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    fileKey?: string | null; // String
    id: number; // Int!
    name?: string | null; // String
    ownerId?: string | null; // String
    status?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  DataTableConnection: { // root type
    edges?: Array<NexusGenRootTypes['DataTableEdge'] | null> | null; // [DataTableEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  DataTableEdge: { // root type
    cursor: string; // String!
    node?: NexusGenRootTypes['DataTable'] | null; // DataTable
  }
  Entry: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id?: string | null; // ID
    tableId?: number | null; // Int
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  EntryConnection: { // root type
    edges?: Array<NexusGenRootTypes['EntryEdge'] | null> | null; // [EntryEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  EntryEdge: { // root type
    cursor: string; // String!
    node?: NexusGenRootTypes['Entry'] | null; // Entry
  }
  Mutation: {};
  PageInfo: { // root type
    endCursor?: string | null; // String
    hasNextPage: boolean; // Boolean!
    hasPreviousPage: boolean; // Boolean!
    startCursor?: string | null; // String
  }
  Query: {};
  User: { // root type
    confirmed: boolean; // Boolean!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    id?: string | null; // String
    password: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    username: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  AuthType: { // field return type
    token: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
  }
  Column: { // field return type
    align: string; // String!
    field: string; // String!
    header: string; // String!
    hidden: boolean; // Boolean!
    id: string; // ID!
    minWidth: number | null; // Int
    table: NexusGenRootTypes['DataTable'] | null; // DataTable
    tableId: number; // Int!
    width: string; // String!
  }
  DataTable: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    entries: NexusGenRootTypes['EntryConnection'] | null; // EntryConnection
    fileKey: string | null; // String
    id: number; // Int!
    name: string | null; // String
    owner: NexusGenRootTypes['User'] | null; // User
    ownerId: string | null; // String
    status: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  DataTableConnection: { // field return type
    edges: Array<NexusGenRootTypes['DataTableEdge'] | null> | null; // [DataTableEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  DataTableEdge: { // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['DataTable'] | null; // DataTable
  }
  Entry: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: string | null; // ID
    table: NexusGenRootTypes['DataTable'] | null; // DataTable
    tableId: number | null; // Int
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  EntryConnection: { // field return type
    edges: Array<NexusGenRootTypes['EntryEdge'] | null> | null; // [EntryEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  EntryEdge: { // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['Entry'] | null; // Entry
  }
  Mutation: { // field return type
    confirmEmail: NexusGenRootTypes['User'] | null; // User
    createDataTable: NexusGenRootTypes['DataTable'] | null; // DataTable
    login: NexusGenRootTypes['AuthType'] | null; // AuthType
    ping: string; // String!
    register: NexusGenRootTypes['User'] | null; // User
    updateColumn: NexusGenRootTypes['Column'] | null; // Column
  }
  PageInfo: { // field return type
    endCursor: string | null; // String
    hasNextPage: boolean; // Boolean!
    hasPreviousPage: boolean; // Boolean!
    startCursor: string | null; // String
  }
  Query: { // field return type
    dataTable: NexusGenRootTypes['DataTable'] | null; // DataTable
    dataTables: NexusGenRootTypes['DataTableConnection'] | null; // DataTableConnection
    drafts: Array<NexusGenRootTypes['DataTable'] | null>; // [DataTable]!
    entry: NexusGenRootTypes['Entry'] | null; // Entry
    getTableColumns: Array<NexusGenRootTypes['Column'] | null> | null; // [Column]
    ok: boolean; // Boolean!
  }
  User: { // field return type
    confirmed: boolean; // Boolean!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    id: string | null; // String
    password: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    username: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  AuthType: { // field return type name
    token: 'String'
    user: 'User'
  }
  Column: { // field return type name
    align: 'String'
    field: 'String'
    header: 'String'
    hidden: 'Boolean'
    id: 'ID'
    minWidth: 'Int'
    table: 'DataTable'
    tableId: 'Int'
    width: 'String'
  }
  DataTable: { // field return type name
    createdAt: 'DateTime'
    entries: 'EntryConnection'
    fileKey: 'String'
    id: 'Int'
    name: 'String'
    owner: 'User'
    ownerId: 'String'
    status: 'String'
    updatedAt: 'DateTime'
  }
  DataTableConnection: { // field return type name
    edges: 'DataTableEdge'
    pageInfo: 'PageInfo'
  }
  DataTableEdge: { // field return type name
    cursor: 'String'
    node: 'DataTable'
  }
  Entry: { // field return type name
    createdAt: 'DateTime'
    id: 'ID'
    table: 'DataTable'
    tableId: 'Int'
    updatedAt: 'DateTime'
  }
  EntryConnection: { // field return type name
    edges: 'EntryEdge'
    pageInfo: 'PageInfo'
  }
  EntryEdge: { // field return type name
    cursor: 'String'
    node: 'Entry'
  }
  Mutation: { // field return type name
    confirmEmail: 'User'
    createDataTable: 'DataTable'
    login: 'AuthType'
    ping: 'String'
    register: 'User'
    updateColumn: 'Column'
  }
  PageInfo: { // field return type name
    endCursor: 'String'
    hasNextPage: 'Boolean'
    hasPreviousPage: 'Boolean'
    startCursor: 'String'
  }
  Query: { // field return type name
    dataTable: 'DataTable'
    dataTables: 'DataTableConnection'
    drafts: 'DataTable'
    entry: 'Entry'
    getTableColumns: 'Column'
    ok: 'Boolean'
  }
  User: { // field return type name
    confirmed: 'Boolean'
    createdAt: 'DateTime'
    email: 'String'
    id: 'String'
    password: 'String'
    updatedAt: 'DateTime'
    username: 'String'
  }
}

export interface NexusGenArgTypes {
  DataTable: {
    entries: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  Mutation: {
    confirmEmail: { // args
      token: string; // String!
    }
    createDataTable: { // args
      input: NexusGenInputs['DataTableInput']; // DataTableInput!
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
    updateColumn: { // args
      id: string; // String!
      input: NexusGenInputs['UpdateColumnInput']; // UpdateColumnInput!
    }
  }
  Query: {
    dataTable: { // args
      id: number; // Int!
    }
    dataTables: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    }
    entry: { // args
      id: string; // String!
    }
    getTableColumns: { // args
      tableId: number; // Int!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

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