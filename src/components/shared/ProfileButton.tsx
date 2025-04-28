import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { CircleUser, User } from "lucide-react";
import { Button } from "../ui";

interface Props {
  className?: string;
  onClickSignIn?: () => void;
}

const ProfileButton = ({ className, onClickSignIn }: Props) => {
  const { data: session } = useSession();
  return (
    <div className={className}>
      {!session ? (
        <Button
          onClick={onClickSignIn}
          variant="outline"
          className="flex items-center gap-2"
        >
          <User size={16} />
          Войти
        </Button>
      ) : (
        <Link href="/profile">
          <Button variant="secondary" className="flex items-center gap-2">
            <CircleUser size={18} />
            Профиль
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ProfileButton;
