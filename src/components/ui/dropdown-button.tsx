import { ChevronDown, HelpCircle, LogOut01, Settings01, User01 } from "@untitledui/icons";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { useAuth } from '@/contexts/auth-context';

export const DropdownButton = () => {
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  if (!user) return null;

  const displayName = profile?.first_name && profile?.last_name
    ? `${profile.first_name} ${profile.last_name}`
    : profile?.first_name
    ? profile.first_name
    : user.email?.split('@')[0] || 'Používateľ';

  const avatarSrc = profile?.avatar_url || undefined;

  return (
    <Dropdown.Root>
      <Button className="group" color="secondary" iconTrailing={ChevronDown}>
        Profil
      </Button>

      <Dropdown.Popover>
        <div className="flex gap-3 border-b border-secondary p-3">
          <AvatarLabelGroup
            size="md"
            src={avatarSrc}
            status="online"
            title={displayName}
            subtitle={user.email || ''}
          />
        </div>
        <Dropdown.Menu>
          <Dropdown.Section>
            <Dropdown.Item 
              icon={User01}
              onAction={() => window.location.href = '/profil'}
            >
              Zobraziť profil
            </Dropdown.Item>
            <Dropdown.Item 
              icon={Settings01}
              onAction={() => window.location.href = '/profil'}
            >
              Nastavenia
            </Dropdown.Item>
          </Dropdown.Section>
          <Dropdown.Separator />
          <Dropdown.Section>
            <Dropdown.Item 
              icon={HelpCircle}
              onAction={() => window.location.href = '/kontakt'}
            >
              Podpora
            </Dropdown.Item>
          </Dropdown.Section>
          <Dropdown.Separator />
          <Dropdown.Section>
            <Dropdown.Item 
              icon={LogOut01}
              onAction={handleSignOut}
            >
              Odhlásiť sa
            </Dropdown.Item>
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
};