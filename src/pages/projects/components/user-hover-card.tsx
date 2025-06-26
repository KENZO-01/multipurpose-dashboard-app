import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserHoverCard = ({ user }: { user: any }) => {
  const initials = user?.first_name?.[0] + user?.last_name?.[0];

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="cursor-pointer">
          <Avatar className="ring-2 ring-background">
            <AvatarImage
              src={`https://api.dicebear.com/9.x/dylan/svg?seed=${user?.username}`}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={`https://api.dicebear.com/9.x/dylan/svg?seed=${user?.username}`}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">
              {user?.first_name} {user?.last_name}
            </h4>
            <p className="text-sm text-muted-foreground">{user?.username}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserHoverCard;