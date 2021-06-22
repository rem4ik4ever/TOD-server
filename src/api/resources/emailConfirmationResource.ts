import { EmailConfirmation, PrismaClient } from '.prisma/client';

export interface EmailConfirmationResource {
  createEmailConfirmation: (userId: string) => Promise<EmailConfirmation>
  findEmailConfirmationById: (token: string) => Promise<EmailConfirmation|null>
  confirmEmail: (token: string) => Promise<EmailConfirmation>
}

export const emailConfirmationResource = ({ client }: {client: PrismaClient}): EmailConfirmationResource => {
  const createEmailConfirmation = async (userId: string): Promise<EmailConfirmation> => {
    const confirmation = await client.emailConfirmation.create({ data: { userId } })
    return confirmation;
  }

  const confirmEmail = async (token: string): Promise<EmailConfirmation> => {
    const confirmation = await client.emailConfirmation.update({
      where: { id: token },
      data: { confirmed: true }
    })
    return confirmation;
  }

  const findEmailConfirmationById = async (token: string): Promise<EmailConfirmation|null> => {
    const confirmation = await client.emailConfirmation.findUnique({ where: { id: token } })
    return confirmation
  }
  return {
    createEmailConfirmation,
    findEmailConfirmationById,
    confirmEmail
  }
}
