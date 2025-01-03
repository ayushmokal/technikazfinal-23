import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export default function Login() {
  const {
    email,
    password,
    isLoading,
    setEmail,
    setPassword,
    handleLogin,
  } = useAdminAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <AdminLoginForm
          email={email}
          password={password}
          isLoading={isLoading}
          onSubmit={handleLogin}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
        />
      </div>
    </div>
  );
}