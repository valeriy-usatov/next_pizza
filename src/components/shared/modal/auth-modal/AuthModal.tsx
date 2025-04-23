import { Button, Dialog } from '@/components/ui';
import { DialogContent } from '@/components/ui/dialog';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import React, { useState } from 'react';
import LoginForm from './forms/LoginForm';

interface Props {
  open: boolean;
  onClose: () => void;
}

const AuthModal = ({ open, onClose }: Props) => {
  const [type, setType] = useState<'login' | 'register'>('login');

  const onSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login');
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[450px] bg-white p-10">
        {type === "login" ? <LoginForm onClose={handleClose}/> : <h1>Register</h1>}
        <hr />
        <div className="flex gap">
          <Button
            variant="secondary"
            onClick={() =>
              signIn('github', {
                /* Второй параметр , говорит о том что у нас будет переходить на главную страницу */
                callbackUrl: '/',
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <Image src="/github.svg" alt="Image" width={15} height={15} />
            GitHub
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              signIn('google', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <Image src="/google.svg" alt="Image" width={15} height={15} />
            Google
          </Button>
        </div>
        <Button variant="outline" onClick={onSwitchType} type="button" className="h-12">
          {type !== 'login' ? 'Войти' : 'Регистрация'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
