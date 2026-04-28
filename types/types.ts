export const FILTERS = ['All', 'Daily', 'Weekly', 'Monthly', 'Yearly'] as const;
export type FilterType = (typeof FILTERS)[number];