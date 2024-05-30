import { NavItem } from '@/types';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Zones Data and Status',
    href: '/zones',
    icon: 'globe',
    label: 'Zones'
  },
  {
    title: 'Regions Data and Status',
    href: '/regions',
    icon: 'map',
    label: 'Regions'
  },
  {
    title: 'Devices Data and Status',
    href: '/devices',
    icon: 'cpu',
    label: 'Devices'
  },
  {
    title: 'Users',
    href: '/users',
    icon: 'user',
    label: 'Users'
  },
  {
    title: 'Technicians',
    href: '/technicians',
    icon: 'technicians',
    label: 'Technicians'
  },
  {
    title: 'Administrator',
    href: '/admin',
    icon: 'admin',
    label: 'Administrator'
  }
];
