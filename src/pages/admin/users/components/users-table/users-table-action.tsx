import PopupModal from '@/components/shared/popup-modal';
import UserCreateForm from '../users-form/user-create-form';

export default function UserTableActions() {
  return (
    <div className=" ml-auto flex items-center justify-end py-5">
      <PopupModal
        renderModal={(onClose) => <UserCreateForm modalClose={onClose} />}
      />
    </div>
  );
}
