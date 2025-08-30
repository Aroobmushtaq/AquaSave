// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { api, unwrap } from "../services/api";


// export default function Login() {
// const [form, setForm] = useState({ email: "", password: "" });
// const [loading, setLoading] = useState(false);
// const [error, setError] = useState("");
// const navigate = useNavigate();
// const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));


// const submit = async (e) => {
// e.preventDefault(); setError(""); setLoading(true);
// const [data, err] = await unwrap(api.post("/users/login", form));
// setLoading(false);
// if (err) { setError(err?.message || "Login failed"); return; }
// localStorage.setItem("token", data?.access_token || data?.token);
// navigate("/dashboard");
// };


// return (
// <div className="container-narrow max-w-lg">
// <h2 className="mt-8 text-2xl font-bold text-slate-800">Welcome back</h2>
// <form onSubmit={submit} className="mt-6 grid gap-4 card p-6">
// <div className="floating">
// <input type="email" name="email" value={form.email} onChange={onChange} placeholder=" " required />
// <label>Email</label>
// </div>
// <div className="floating">
// <input type="password" name="password" value={form.password} onChange={onChange} placeholder=" " required />
// <label>Password</label>
// </div>
// {error && <p className="text-sm text-rose-600">{error}</p>}
// <button disabled={loading} className="btn btn-primary">{loading ? "Signing in…" : "Login"}</button>
// <div className="text-right text-sm">
// <Link className="text-teal-700 hover:underline" to="#">Forgot password?</Link>
// </div>
// </form>
// </div>
// );
// }

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api, unwrap } from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Call backend login API
    const [data, err] = await unwrap(api.post("/users/login", form));
    setLoading(false);

    if (err) {
      setError(err?.detail || err?.message || "Login failed");
      return;
    }

    // Save JWT token
    localStorage.setItem("token", data?.access_token);
    navigate("/dashboard");
  };

  return (
    <div className="container-narrow max-w-lg">
      <h2 className="mt-8 text-2xl font-bold text-slate-800">
        Welcome back
      </h2>
      <form onSubmit={submit} className="mt-6 grid gap-4 card p-6">
        <div className="floating">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder=" "
            required
          />
          <label>Email</label>
        </div>
        <div className="floating">
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder=" "
            required
          />
          <label>Password</label>
        </div>
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <button disabled={loading} className="btn btn-primary">
          {loading ? "Signing in…" : "Login"}
        </button>
        <div className="flex justify-between text-sm mt-2">
          <Link className="text-teal-700 hover:underline" to="#">
            Forgot password?
          </Link>
          <Link className="text-teal-700 hover:underline" to="/register">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
}
