'use client'

import { format, isSameDay } from 'date-fns';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Transaction } from '../../types/transction.type';
import { transactions as transactionMock } from '../mockData/mock-transaction.mock';

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'M/d/yyyy'))

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setTransactions(transactionMock)
      setLoading(false)
    }, 1000)
  }, [])

  async function mockUpdate(): Promise<Transaction[]> {
    return new Promise((_, reject) => {
      reject(new Error('The transaction failed, please try again later'))
    })
  }

  async function handleUpdate() {
    setLoading(true)
    try {
      const result = await mockUpdate()
      if (result) {
        setTransactions(result)
      }
    } catch (error: any) {
      toast.error(error?.message, {
        position: "top-right"
      });
    } finally {
      setLoading(false)
    }
  }

  function handleFilterTransactionByDate(event:  ChangeEvent<HTMLInputElement>) {
    event.persist()
    const date = event.target.value

    setSelectedDate(date)

    // TODO: check bug with dates
    
    const filteredTransactions = transactions.filter(transaction => {
      return isSameDay(transaction.date, date)
    })

    if (filteredTransactions) {
      setTransactions(filteredTransactions)
    }
  }

  return (
    <main className=' w-full h-[100vh]'>
      <header className='w-full bg-blue-900 py-4 mb-8'>
        <h1 className='text-center text-4xl '>Welcome to the America&apos;s Bank</h1>
      </header>
      <div className=' w-2/3 mx-auto '>
        <section className='flex flex-col relative'>
          { loading  ?
            <p className=''>Loading...</p>
            : transactions.length ? <>
              <button className='bg-blue-900 mb-4' onClick={handleUpdate}>Update</button>
              <div className='flex gap-8'>
                <label htmlFor='date'>
                  filter by date
                </label>
                <input name='date' id='date' className=' placeholder:text-slate-700 text-slate-700 mb-4' type='date' onChange={handleFilterTransactionByDate} value={format(selectedDate, 'M/d/yyyy')}/>
              </div>
              {transactions.map(transaction => (
                <div
                  className=' w-full bg-blue-900 rounded-lg mb-4 p-2'
                  key={transaction.id}
                > 
                  <p className='mb-4 font-thin text-xs'>Transaction ID: {transaction.id}</p>
                  <div className='flex justify-between mb-4'>
                    <p>{transaction.description}</p>
                    <p>$ {transaction.amount}</p>
                  </div>
                  <p className=' text-xs font-thin'>{format(transaction.date, 'M/d/yyyy')}</p>
                </div>
              ))}
            </>
            : <div>
                <p>No transactions on this date</p>
                <button  className='bg-blue-900' onClick={() => setTransactions(transactionMock)}>reload</button>
              </div>
          }
        </section>
      </div>
    </main>
  );
}
