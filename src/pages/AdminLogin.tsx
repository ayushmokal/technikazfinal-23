import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export default function AdminLogin() {
  const {
    email,
    password,
    isSigningUp,
    isLoading,
    setEmail,
    setPassword,
    setIsSigningUp,
    handleSignUp,
    handleLogin,
  } = useAdminAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin {isSigningUp ? "Sign Up" : "Login"}
          </h2>
          {isSigningUp && (
            <p className="mt-2 text-center text-sm text-gray-600">
              Password must be at least 6 characters long
            </p>
          )}
        </div>
        
        <AdminLoginForm
          email={email}
          password={password}
          isSigningUp={isSigningUp}
          isLoading={isLoading}
          onSubmit={isSigningUp ? handleSignUp : handleLogin}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
        />

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsSigningUp(!isSigningUp)}
            className="text-sm text-blue-600 hover:text-blue-800"
            disabled={isLoading}
          >
            {isSigningUp
              ? "Already have an account? Sign in"
              : "Need to create an admin account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}