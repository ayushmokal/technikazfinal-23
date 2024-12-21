import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminAuthState } from "@/hooks/useAdminAuth";

interface AdminLoginFormProps extends AdminAuthState {
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
}

export const AdminLoginForm = ({
  email,
  password,
  isLoading,
  isSigningUp,
  onSubmit,
  onEmailChange,
  onPasswordChange,
}: AdminLoginFormProps) => {
  return (
    <form className="mt-8 space-y-6" onSubmit={onSubmit}>
      <div className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
            minLength={6}
            disabled={isLoading}
          />
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Processing..." : (isSigningUp ? "Sign Up" : "Sign In")}
      </Button>
    </form>
  );
};