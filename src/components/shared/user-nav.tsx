import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { deleteCookie } from '@/lib/cookies';
import { auth } from '@/api/auth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export default function UserNav() {
  const { logout } = auth();
  const handleLogout = async () => {
    await logout();
    deleteCookie('auth.__token');
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-14 w-14 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={'https://avatar.iran.liara.run/public/boy?username=Ash'}
              alt={''}
            />
            <AvatarFallback>hello</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem onClick={handleLogout}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
