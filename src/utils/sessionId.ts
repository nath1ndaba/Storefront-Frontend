export const getSessionId = (): string => {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = 'session_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

export const formatCurrency = (amount?: number): string => {
  if (amount === undefined) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const getCategoryName = (category?: number): string => {
  const categories: Record<number, string> = {
    1: 'Electronics',
    2: 'Clothing',
    3: 'Books',
    4: 'Home',
    5: 'Sports',
    6: 'Toys',
    7: 'Food',
    8: 'Beauty',
    99: 'Other',
  };
  return categories[category || 99] || 'Other';
};