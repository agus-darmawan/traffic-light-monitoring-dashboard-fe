import { NavItem } from '@/types';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Zones Data and Status',
    href: '/admin/zones',
    icon: 'globe',
    label: 'Zones'
  },
  {
    title: 'Regions Data and Status',
    href: '/admin/regions',
    icon: 'map',
    label: 'Regions'
  },
  {
    title: 'Devices Data and Status',
    href: '/admin/devices',
    icon: 'cpu',
    label: 'Devices'
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: 'user',
    label: 'Users'
  },
  {
    title: 'Technicians',
    href: '/admin/technicians',
    icon: 'technicians',
    label: 'Technicians'
  },
  {
    title: 'Administrator',
    href: '/admin/admin',
    icon: 'admin',
    label: 'Administrator'
  }
];
