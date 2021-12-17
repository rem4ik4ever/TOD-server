import repl from 'repl';
import { prisma } from './api/db';
import stripeApi from './lib/stripe';

// open the repl session
const replServer = repl.start({});

// attach modules to the repl context
replServer.context.prisma = prisma;
replServer.context.stripe = stripeApi;
