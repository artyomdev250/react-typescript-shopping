import { type FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSignIn } from "../../hooks/auth/useSignIn";

function SignInForm() {
    const { signIn, loading, error, setError } = useSignIn();
    const navigate = useNavigate();
    const location = useLocation() as any;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await signIn(email, password);
            navigate(from, { replace: true });
        } catch {
            // error is already handled inside the hook
        }
    };

    return (
        <form className="w-fit" onSubmit={handleSubmit}>
            <p className="font-bold text-[30px]">Welcome Back 👋</p>
            <p className="mt-7 mb-12 text-[19px] max-w-[410px] text-[#313957]">
                Today is a new day. It's your day. You shape it. Sign in to start
                managing your items!
            </p>

            <div className="flex flex-col gap-2 mb-6">
                <span className="font-medium">Email</span>
                <input
                    type="email"
                    className="input"
                    placeholder="Example@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2 mb-6">
                <span className="font-medium">Password</span>
                <input
                    type="password"
                    className="input"
                    placeholder="At least 8 characters"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {error && <p className="mb-4 text-red-600 text-sm">{error}</p>}

            <button className="button" type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
            </button>
        </form>
    );
}

export default SignInForm;
