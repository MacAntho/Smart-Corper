
import { MOCK_USER } from '../constants';

export interface PaymentConfig {
  email: string;
  amount: number; // in kobo
  reference: string;
  callback_url: string;
  metadata: {
    user_id: string;
    plan: 'pro';
    duration: '1_year' | '1_month';
  };
}

export const initializePayment = (plan: 'pro', cycle: 'monthly' | 'yearly'): string => {
  // Billed in kobo (NGN 3,000 = 300,000 kobo)
  const amount = cycle === 'monthly' ? 100000 : 300000; 
  const reference = `SC-${Math.floor(Math.random() * 1000000000)}`;
  
  const config: PaymentConfig = {
    email: MOCK_USER.email,
    amount,
    reference,
    callback_url: `${window.location.origin}/#/payment/verify`,
    metadata: {
      user_id: MOCK_USER.id,
      plan: 'pro',
      duration: cycle === 'monthly' ? '1_month' : '1_year',
    }
  };

  sessionStorage.setItem('pending_payment', JSON.stringify(config));
  return `#/payment/gateway?ref=${reference}`;
};

export const verifyPayment = async (reference: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const pending = sessionStorage.getItem('pending_payment');
  if (!pending) return false;
  
  const config: PaymentConfig = JSON.parse(pending);
  
  if (config.reference === reference) {
    MOCK_USER.isPro = true;
    sessionStorage.removeItem('pending_payment');
    return true;
  }
  
  return false;
};
