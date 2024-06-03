import * as React from 'react';
import { Flex, Icon, LogoMarkMono, Spacer, useToast } from '@aircall/tractor';

import { FormState, FormStateEnum, LOGIN_REJECTED } from './Login.decl';
import { LoginForm } from './LoginForm';
import { useAuth } from '../../hooks/useAuth';

export const LoginPage = () => {
  const { login } = useAuth();
  const [formState, setFormState] = React.useState<FormState>(FormStateEnum.Idle);
  const { showToast } = useToast();

  const onSubmit = async (email: string, password: string) => {
    try {
      setFormState(FormStateEnum.Pending);
      await login({ username: email, password });
    } catch (error) {
      console.log(error);
      showToast({
        id: LOGIN_REJECTED,
        message: 'Invalid email or password',
        variant: 'error'
      });
    }
  };

  return (
    <Spacer
      maxWidth={500}
      p={5}
      h="100%"
      direction="vertical"
      justifyContent="center"
      fluid
      space={5}
    >
      <Flex alignItems="center">
        <Icon component={LogoMarkMono} size={60} mx="auto" />
      </Flex>
      <LoginForm onSubmit={onSubmit} formState={formState} />
    </Spacer>
  );
};
