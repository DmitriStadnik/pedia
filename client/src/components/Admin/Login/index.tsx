import { Button, Card, H5, InputGroup, Intent } from '@blueprintjs/core';
import React, { Fragment, useCallback, useState } from 'react';

import './Login.css';

const LockButton: React.FC<{
  showPassword: boolean, 
  handleLockClick: () => void
}> = ({showPassword, handleLockClick}) => (
  <Button
    icon={showPassword ? "unlock" : "lock"}
    intent={Intent.WARNING}
    minimal={true}
    onClick={handleLockClick}
  />
);

export const Login: React.FC<{handleLogin: (password: string) => void}> = ({handleLogin}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')

  const handleLockClick = () => {
    setShowPassword(!showPassword);
  }

  const handleButtonClick = useCallback(() => {
    handleLogin(password)
  }, [password]);

  return (
    <Fragment>
      <div className="login">
        <Card className='login__card'>
          <H5 className='login__header'>Enter password</H5>
          <InputGroup
            large
            placeholder=""
            rightElement={<LockButton 
              showPassword={showPassword} 
              handleLockClick={handleLockClick} 
            />}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button className='button button_login' onClick={handleButtonClick}>
            Enter
          </Button>
        </Card>
      </div>
    </Fragment>
  );
};
