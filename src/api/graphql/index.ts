import { asNexusMethod } from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'

export * from './DataTable'
export * from './mutations'
export * from './query'
// export * from './User'
export const DateTime = asNexusMethod(DateTimeResolver, 'date')
