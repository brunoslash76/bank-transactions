import { format, subDays } from 'date-fns';
import { Transaction } from "../../types/transction.type";


export const transactions: Transaction[] = [
  {
    amount: 1910.54,
    date: subDays(format(new Date(), 'M/d/yyyy'), 2),
    description: 'Rent payment',
    id: `${Math.random() * 1000000}`,
  },
  {
    amount: 10.54,
    date: subDays(format(new Date(), 'M/d/yyyy'), 0),
    description: 'Book',
    id: `${Math.random() * 1000000}`,
  },
  {
    amount: 54.54,
    date: subDays(format(new Date(), 'M/d/yyyy'), 4),
    description: 'Dinner',
    id: `${Math.random() * 1000000}`,
  },
  {
    amount: 25.55,
    date: subDays(format(new Date(), 'M/d/yyyy'), 4),
    description: 'Lunch',
    id: `${Math.random() * 1000000}`,
  },
]
