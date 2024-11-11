import { auth, clerkClient } from "@clerk/nextjs/server";
import { getCurrentMonthTransactions } from "../get-current-month-transactions";

export const canUserGetTransaction = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const clerk = await clerkClient();

  const user = await clerk.users.getUser(userId);

  if (user.publicMetadata.subscriptionPlan === "premium") {
    return true;
  }

  const currencyMonthTransactions = await getCurrentMonthTransactions();

  if (currencyMonthTransactions >= 10) {
    return false;
  }

  return true;
};
