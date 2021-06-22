import { EmailConfirmation, PrismaClient } from '.prisma/client';

export interface EmailConfirmationResource {
  createEmailConfirmation: (userId: string) => Promise<EmailConfirmation>
  updateEmailConfirmation: (token: string) => Promise<EmailConfirmation>
}

export const emailConfirmationResource = ({ client }: {client: PrismaClient}): EmailConfirmationResource => {
  const createEmailConfirmation = async (userId: string): Promise<EmailConfirmation> => {
    const confirmation = await client.emailConfirmation.create({ data: { userId } })
    return confirmation;
  }

  const updateEmailConfirmation = async (token: string): Promise<EmailConfirmation> => {
    const confirmation = await client.emailConfirmation.update({
      where: { id: token },
      data: { confirmed: true }
    })
    return confirmation;
  }
  return {
    createEmailConfirmation,
    updateEmailConfirmation
  }
}
