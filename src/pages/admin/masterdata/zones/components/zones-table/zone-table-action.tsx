import PopupModal from '@/components/shared/popup-modal';
import ZoneCreateForm from '../zones-form/zone-create-form';

export default function ZoneTableActions() {
  return (
    <div className=" ml-auto flex items-center justify-end py-5">
      <PopupModal
        renderModal={(onClose) => <ZoneCreateForm modalClose={onClose} />}
      />
    </div>
  );
}
