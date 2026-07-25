export interface NavItem {
  label: string;
  path: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Monitor', path: '/monitor' },
  { label: 'Add data', path: '/add-data' },
];