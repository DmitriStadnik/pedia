import { Button, Card, H5, InputGroup, Intent } from '@blueprintjs/core';
import React, { FormEvent, Fragment, useCallback, useState } from 'react';

import './Login.css';

interface LockButtonProps {
  showPassword: boolean;
  handleLockClick: () => void;
}

interface LoginProps {
  handleLogin: (password: string) => void;
}

const LockButton: React.FC<LockButtonProps> = ({
  showPassword,
  handleLockClick,
}) => (
  <Button
    icon={showPassword ? 'unlock' : 'lock'}
    intent={Intent.WARNING}
    minimal={true}
    onClick={handleLockClick}
  />
);

export const Login: React.FC<LoginProps> = ({ handleLogin }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');

  const handleLockClick = () => {
    setShowPassword(!showPassword);
  };

  const handleButtonClick = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleLogin(password);
    },
    [password]
  );

  return (
    <Fragment>
      <div className="login">
        <Card className="login__card">
          <H5 className="login__header">Password</H5>
          <form onSubmit={(e) => handleButtonClick(e)}>
            <InputGroup
              large
              placeholder=""
              rightElement={
                <LockButton
                  showPassword={showPassword}
                  handleLockClick={handleLockClick}
                />
              }
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button className="button button_login" type="submit">
              Enter
            </Button>
          </form>
        </Card>
      </div>
    </Fragment>
  );
};
