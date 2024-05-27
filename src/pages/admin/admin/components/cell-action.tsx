import { AlertModal } from '@/components/shared/alert-modal';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import useAuthStore from '@/stores/useAuthStore';
import type { User } from '@/types/user';
import { update } from '@/api/users';
import { Trash } from 'lucide-react';
import { useState } from 'react';

interface CellActionProps {
  data: User;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { toast } = useToast();
  const { getToken } = useAuthStore();
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);

  const onConfirm = async () => {
    try {
      const newdata = {
        email: data.email,
        role: 'user'
      };
      await update(data.id, newdata, getToken());
      toast({
        title: 'Success',
        description: 'Admin have been removed and now will be as user'
      });
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      if (error) {
        toast({
          title: 'Failed',
          description: 'Delate failed'
        });
      }
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <Button
        variant="destructive"
        className="px-2 py-2"
        onClick={() => setOpen(true)}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </>
  );
};
