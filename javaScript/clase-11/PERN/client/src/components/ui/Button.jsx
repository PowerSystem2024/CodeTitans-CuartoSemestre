export const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`relative inline-flex items-center gap-1.5 text-sm font-semibold
     text-white shadow-sm py-1.5 px-4 rounded
      bg-blue-500 hover:bg-blue-400 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
