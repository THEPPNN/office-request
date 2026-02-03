import { useState } from "react";
import AuthLayout from "../components/layout/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import ErrorMessage from "../components/ui/ErrorMessage";
import { authService } from "../services/auth.service";

import { useNavigate } from "react-router-dom";
import { authStorage } from "../utils/authStorage";
import { redirectByRole } from "../utils/redirectByRole";

export default function Login() {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
        const res = await authService.login({ email, password });
        setLoading(false);
        if(res.token) {
            authStorage.setAuth(res.token, res.user.role , res.user.id);
            const path = redirectByRole(res.user.role);
            navigate(path, { replace: true });
        } else {
            setError("Invalid email or password");
        }
      
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <ErrorMessage message={error} />}

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </AuthLayout>
  );
}