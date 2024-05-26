import PopupModal from '@/components/shared/popup-modal';
import DeviceCreateForm from '../devices-form/device-create-form';

export default function DeviceTableActions({ zones }: any) {
  return (
    <div className=" ml-auto flex items-center justify-end py-5">
      <div className="flex gap-3">
        <PopupModal
          renderModal={(onClose) => (
            <DeviceCreateForm modalClose={onClose} zones={zones} />
          )}
        />
      </div>
    </div>
  );
}
