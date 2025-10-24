export const Button = ({ children }) => {
  return (
    <button
      className="relative inline-flex items-center gap-1.5 text-sm font-semibold
     text-white shadow-sm py-1.5 px-4 rounded
      bg-blue-500 hover:bg-blue-400 
       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600
      disabled:opacity-50 disabled:pointer-events-none"
    >
      {children}
    </button>
  );
};
