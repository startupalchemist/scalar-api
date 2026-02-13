import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import logoMark from "@assets/Asset_7@3x-8_1770967674840.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      setLocation("/admin");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0B0B0D] min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-3 mb-10">
          <img src={logoMark} alt="Dent Society" className="h-10 w-auto" />
          <span className="text-[#F5F5F7] font-semibold tracking-[0.2em] text-sm uppercase">
            Dent Society
          </span>
        </div>

        <div className="p-8 rounded-md bg-[#141416] border border-white/5">
          <h1
            className="text-sm uppercase tracking-[0.15em] font-semibold text-[#F5F5F7] mb-6 text-center"
            data-testid="text-login-headline"
          >
            Admin Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-login">
            <div>
              <label className="text-xs uppercase tracking-[0.15em] text-[#B3B3B8] font-semibold block mb-1.5">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#0B0B0D] border-white/10 text-[#F5F5F7] placeholder:text-[#B3B3B8]/30 focus:border-[#FF192C]/50"
                placeholder="email@example.com"
                data-testid="input-login-email"
                required
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.15em] text-[#B3B3B8] font-semibold block mb-1.5">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#0B0B0D] border-white/10 text-[#F5F5F7] placeholder:text-[#B3B3B8]/30 focus:border-[#FF192C]/50"
                data-testid="input-login-password"
                required
              />
            </div>

            {error && (
              <p className="text-xs text-[#FF192C]" data-testid="text-login-error">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF192C] text-white border-[#FF192C] text-xs uppercase tracking-[0.15em] font-semibold"
              data-testid="button-login-submit"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
