import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    if (!isLogin && !username) {
      setError("Username is required");
      return;
    }

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        // Store username in metadata or a separate table
        await signUp(email, password);
        // Username is handled in the signUp function
      }
      onClose();
    } catch (error) {
      console.error("Auth error:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-xl p-0 gap-0">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-xl font-semibold text-center">
            {isLogin ? "Login" : "Sign up"}
          </DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <span className="text-2xl">×</span>
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 pl-4 pr-4 rounded-lg border border-gray-300 w-full"
                  required
                />
              </div>
            </div>

            {/* Username Input (only for signup) */}
            {!isLogin && (
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-14 pl-4 pr-4 rounded-lg border border-gray-300 w-full"
                    required
                  />
                </div>
              </div>
            )}

            {/* Password Input */}
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 pl-4 pr-4 rounded-lg border border-gray-300 w-full"
                  required
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-14 bg-[#FF385C] hover:bg-[#FF385C]/90 text-white rounded-lg text-base font-medium"
            >
              {isLogin ? "Send One Time Password" : "Sign Up"}
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Continue with Email */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-14 border border-gray-300 rounded-lg flex items-center justify-center gap-2 text-base font-medium"
              onClick={() => setIsLogin(!isLogin)}
            >
              <Mail className="h-5 w-5 text-[#FF385C]" />
              Continue with Email
            </Button>

            {/* Updated Google Sign In Button - Matching the new design */}
            <button
              type="button"
              className="w-full h-14 bg-white border border-gray-300 rounded-lg flex items-center justify-center gap-3 text-base font-medium hover:bg-gray-50 transition-colors"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google"
                className="h-5 w-5"
              />
              <span className="text-gray-700">Sign in with Google</span>
            </button>

            {/* New to Airbnb */}
            <div className="text-center pt-4 border-t">
              <p className="text-gray-700">
                {isLogin ? "New to Airbnb?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  className="text-[#FF385C] font-medium hover:underline"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Create account" : "Login"}
                </button>
              </p>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}