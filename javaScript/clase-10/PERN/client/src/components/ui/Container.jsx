export const Container = ({ children, className }) => {
  return (
    <div className={`container max-w-7xl mx-auto px-4 ${className}`}>
      {children}
    </div>
  );
};
