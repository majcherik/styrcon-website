import { ChevronDownIcon, HelpCircleIcon, LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth, useUser } from '@clerk/nextjs';

export const DropdownButton = () => {
  const { signOut } = useAuth();
  const { user, isLoaded } = useUser();

  const handleSignOut = async () => {
    await signOut();
  };

  if (!isLoaded || !user) return null;

  const displayName = user.firstName && user.lastName
    ? `${user.firstName} ${user.lastName}`
    : user.firstName
    ? user.firstName
    : user.primaryEmailAddress?.emailAddress?.split('@')[0] || 'Používateľ';

  const avatarSrc = user.imageUrl || undefined;

  // Generate initials from display name
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage src={avatarSrc} alt="Profile image" />
            <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
          </Avatar>
          <ChevronDownIcon
            size={16}
            className="opacity-60"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64 bg-white border border-gray-200 shadow-lg z-[9999]">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {displayName}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {user.primaryEmailAddress?.emailAddress || ''}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => window.location.href = '/profil'}>
            <UserIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Zobraziť profil</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => window.location.href = '/profil'}>
            <SettingsIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Nastavenia</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => window.location.href = '/kontakt'}>
            <HelpCircleIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Podpora</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Odhlásiť sa</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};