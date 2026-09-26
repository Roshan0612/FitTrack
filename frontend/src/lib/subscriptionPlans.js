const PLANS_CACHE_KEY = 'fittrack:subscription-plans';

export const getCachedSubscriptionPlans = () => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const cachedPlans = window.localStorage.getItem(PLANS_CACHE_KEY);
    const parsedPlans = cachedPlans ? JSON.parse(cachedPlans) : [];
    return Array.isArray(parsedPlans) ? parsedPlans : [];
  } catch {
    return [];
  }
};

export const cacheSubscriptionPlans = (plans) => {
  if (typeof window === 'undefined' || !Array.isArray(plans)) {
    return;
  }

  try {
    window.localStorage.setItem(PLANS_CACHE_KEY, JSON.stringify(plans));
  } catch {
    // Storage can be unavailable in private browsing or restricted contexts.
  }
};
