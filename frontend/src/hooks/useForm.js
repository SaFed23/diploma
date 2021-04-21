import { useForm as useReactHookForm } from 'react-hook-form';

const useForm = (init) => {
  const { register, ...props } = useReactHookForm(init);

  const muiRegister = (registerSettings) => {
    const { ref, ...rest } = register(registerSettings);
    return {
      inputRef: ref,
      ...rest,
    };
  };

  return { ...props, register, muiRegister };
};

export default useForm;
