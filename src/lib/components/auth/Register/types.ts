export type RegisterFormType = {
  name: string;
  email: string;
  password: string;
};

export type RegisterProps = {
  handleSwitchToLogin: () => void;
};
