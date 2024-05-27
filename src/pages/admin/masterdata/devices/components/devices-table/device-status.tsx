import { Badge } from '@/components/ui/badge';
import React from 'react';

interface IDeviceStatus {
  status: 'active' | 'problem' | 'issue';
}

export const DeviceStatus: React.FC<IDeviceStatus> = ({ status }) => {
  let variant;
  let className = '';

  switch (status) {
    case 'active':
      variant = 'secondary';
      break;
    case 'problem':
      variant = 'destructive';
      break;
    case 'issue':
      variant = 'default';
      className = 'bg-yellow-400 text-white hover:bg-yellow-300';
      break;
    default:
      variant = 'default';
  }

  return (
    <Badge variant={variant} className={className}>
      {status.charAt(0).toUpperCase() + status.slice(1)}{' '}
    </Badge>
  );
};
