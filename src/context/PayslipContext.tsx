import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Payslip } from '../types';

interface PayslipContextType {
  payslips: Payslip[];
}

const mockPayslips: Payslip[] = [
  {
    id: '1',
    fromDate: '2025-08-01',
    toDate: '2025-08-31',
    file: 'payslip.pdf',
  },
  {
    id: '2',
    fromDate: '2025-07-01',
    toDate: '2025-07-31',
    file: 'payslip.pdf',
  },
];

const PayslipContext = createContext<PayslipContextType>({ payslips: [] });

export const PayslipProvider = ({ children }: { children: ReactNode }) => {
  const [payslips] = useState<Payslip[]>(mockPayslips);
  return (
    <PayslipContext.Provider value={{ payslips }}>
      {children}
    </PayslipContext.Provider>
  );
};

export const usePayslips = () => useContext(PayslipContext);
