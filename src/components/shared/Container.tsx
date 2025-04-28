interface Props {
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div className={`mx-auto max-w-[1280px] ${className}`}>{children}</div>
  );
};
