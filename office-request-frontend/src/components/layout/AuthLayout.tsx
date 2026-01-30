type Props = {
    children: React.ReactNode;
  };
  
  export default function AuthLayout({ children }: Props) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Office Request System
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Login to your account
          </p>
  
          {children}
  
          <p className="text-xs text-center text-gray-400 mt-6">
            © 2026 Office Request System
          </p>
        </div>
      </div>
    );
  }