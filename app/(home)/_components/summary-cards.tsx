import {
  PiggyBankIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  WalletIcon,
} from "lucide-react";

import SummaryCard from "./summary-card";
import { db } from "@/app/_lib/prisma";

interface SummaryCardsProps {
  month: string;
}

const SummaryCards = async ({ month }: SummaryCardsProps) => {
  const where = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lt: new Date(`2024-${month}-31`),
    },
  };

  const depositTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          ...where,
          type: "DEPOSIT",
        },
        _sum: {
          amount: true,
        },
      })
    )?._sum.amount,
  );

  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          ...where,
          type: "INVESTMENT",
        },
        _sum: {
          amount: true,
        },
      })
    )?._sum.amount,
  );

  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          ...where,
          type: "EXPENSE",
        },
        _sum: {
          amount: true,
        },
      })
    )?._sum.amount,
  );

  const balance = depositTotal - investmentsTotal - expensesTotal;

  return (
    <div className="space-y-6">
      <SummaryCard
        icon={<WalletIcon size={16} className="text-white" />}
        title="Saldo"
        amount={balance}
        size="large"
      />
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={14} className="text-white" />}
          title="Investido"
          amount={investmentsTotal}
          size="small"
        />
        <SummaryCard
          icon={<TrendingUpIcon size={14} className="text-primary" />}
          title="Receita"
          amount={depositTotal}
          size="small"
        />
        <SummaryCard
          icon={<TrendingDownIcon size={14} className="text-danger" />}
          title="Despesas"
          amount={expensesTotal}
          size="small"
        />
      </div>
    </div>
  );
};

export default SummaryCards;
