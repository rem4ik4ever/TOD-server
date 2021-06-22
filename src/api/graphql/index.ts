import { asNexusMethod } from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'

export * from './DataTable'
export * from './User'
export * from './Authentication'
export * from './mutations'
export * from './query'
export const DateTime = asNexusMethod(DateTimeResolver, 'date')