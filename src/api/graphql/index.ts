import { asNexusMethod } from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'

export * from './DataTable'
export * from './Entry'
export * from './Column'
export * from './User'
export * from './Authentication'
export * from './EmailTemplate'
export * from './mutations'
export * from './query'
export const DateTime = asNexusMethod(DateTimeResolver, 'date')
