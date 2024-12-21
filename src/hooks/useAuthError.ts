import { Toast } from "@/hooks/use-toast";

export const handleAuthError = (error: any, toast: Toast) => {
  if (error.message.includes('rate_limit')) {
    toast({
      variant: "destructive",
      title: "Rate Limit Exceeded",
      description: "Please wait a moment before trying again.",
    });
    return;
  }

  if (error.message.includes('email_not_confirmed')) {
    toast({
      variant: "destructive",
      title: "Email Not Confirmed",
      description: "Please check your email and confirm your account before logging in. Check your spam folder if you don't see the email.",
    });
    return;
  }

  toast({
    variant: "destructive",
    title: "Error",
    description: error.message,
  });
};