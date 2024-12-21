import { useToast } from "@/hooks/use-toast";
type Toast = ReturnType<typeof useToast>["toast"];

export const handleAuthError = (error: any, toast: Toast) => {
  if (error.message.includes('rate_limit')) {
    toast({
      variant: "destructive",
      title: "Rate Limit Exceeded",
      description: "Please wait a moment before trying again.",
    });
    return;
  }

  if (error.message.includes('invalid_credentials')) {
    toast({
      variant: "destructive",
      title: "Invalid Credentials",
      description: "The email or password you entered is incorrect. Please try again.",
    });
    return;
  }

  toast({
    variant: "destructive",
    title: "Error",
    description: error.message,
  });
};