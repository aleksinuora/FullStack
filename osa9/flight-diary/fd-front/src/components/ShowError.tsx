interface ErrorProps {
  message: string | null;
}

export const ShowError = ({ message }: ErrorProps) => {
  return <div style={{ color: 'red' }}>{message}</div>;
};
