import { Badge } from '@/components/ui/badge';
interface IDeviceStatus {
  status: boolean;
}

export const DeviceStatus: React.FC<IDeviceStatus> = ({ status }) => {
  return (
    <Badge variant={status ? 'secondary' : 'destructive'}>
      {status ? 'Active' : 'Inactive'}
    </Badge>
  );
};
