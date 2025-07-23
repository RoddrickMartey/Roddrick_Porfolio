// /components/Auth/SecretLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Key } from "lucide-react";

function SecretLogin({
  open: controlledOpen,
  onOpenChange,
  hideTrigger = false,
}) {
  const isControlled = controlledOpen !== undefined;
  const [openInternal, setOpenInternal] = useState(false);
  const open = isControlled ? controlledOpen : openInternal;
  const setOpen = isControlled ? onOpenChange : setOpenInternal;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleConfirmLogin = async (e) => {
    e?.preventDefault?.();
    setLoginError("");
    setLoading(true);
    try {
      await login(username, password);
      setOpen(false);
      navigate("/admin/details");
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || "Login failed.";
      setLoginError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Only render the floating key trigger if not hidden & component is uncontrolled */}
      {!hideTrigger && !isControlled && (
        <div className="fixed z-50 bottom-4 right-4">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setOpen(true)}
            className="transition opacity-20 hover:opacity-100"
            aria-label="Open admin login"
          >
            <Key className="w-5 h-5" />
          </Button>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Login</DialogTitle>
            <DialogDescription>
              Enter credentials to access admin tools.
            </DialogDescription>
          </DialogHeader>

          {loginError && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleConfirmLogin}>
            <Card className="p-0 bg-transparent border-0 shadow-none">
              <CardHeader className="p-0 pb-4">
                <Label className="text-lg font-semibold">Login</Label>
              </CardHeader>

              <CardContent className="p-0 space-y-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="secret-username">Username</Label>
                  <Input
                    id="secret-username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading}
                    autoComplete="username"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="secret-password">Password</Label>
                  <Input
                    id="secret-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    autoComplete="current-password"
                  />
                </div>
              </CardContent>

              <CardFooter className="p-0 pt-6">
                <Button
                  type="submit"
                  disabled={loading || !username || !password}
                  className="w-full"
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SecretLogin;
