import Stripe from 'stripe';
import * as dotenv from 'dotenv';

dotenv.config();

const secretKey = String(process.env.STRIPE_SECRET_KEY)

const stripe = new Stripe(secretKey, { apiVersion: '2020-08-27' })

const getCheckoutSession = async (sessionId: string): Promise<Stripe.Checkout.Session> => {
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  return session
}

const getSubscription = async (subscriptionId: string): Promise<Stripe.Subscription & {plan?: Stripe.Plan}> => {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  return subscription;
}

export interface StripeMetadata {
  customer: string | Stripe.Customer | Stripe.DeletedCustomer | null
  subscription: string | Stripe.Subscription | null
  price: number | null
  currency: string | null
}
export const extractMetadataFromCheckoutSession = (checkoutSession: Stripe.Checkout.Session): StripeMetadata => {
  return {
    customer: checkoutSession.customer,
    subscription: checkoutSession.subscription,
    price: checkoutSession.amount_total,
    currency: checkoutSession.currency
  }
}

export default {
  stripe,
  getCheckoutSession,
  getSubscription
}
