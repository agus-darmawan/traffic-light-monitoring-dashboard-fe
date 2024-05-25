import { AlertModal } from '@/components/shared/alert-modal';
import { Button } from '@/components/ui/button';
import ZoneUpdateForm from '../zones-form/zone-update-form';
import { useToast } from '@/components/ui/use-toast';
import useAuthStore from '@/stores/useAuthStore';
import type { Zones } from '@/types/zones';
import { destroy } from '@/api/zones';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import { Modal } from '@/components/ui/modal';

interface CellActionProps {
  data: Zones;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { toast } = useToast();
  const { getToken } = useAuthStore();
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const onConfirm = async () => {
    try {
      await destroy(data.id, getToken());
      toast({
        title: 'Success',
        description: 'Zones have been deleted'
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

      <Modal isOpen={openUpdate} onClose={() => setOpenUpdate(false)}>
        <ZoneUpdateForm modalClose={() => setOpenUpdate(false)} data={data} />
      </Modal>

      <Button variant="secondary" className="px-3 py-2">
        <Edit className="mr-2 h-4 w-4" />
      </Button>
      <Button variant="secondary" className="px-3 py-2">
        <Trash className="mr-2 h-4 w-4" />
      </Button>

      {/* <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="px-3 py-2">
            <span className="text-center ">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => setOpenUpdate(true)}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </>
  );
};
