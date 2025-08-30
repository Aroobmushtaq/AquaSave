// import { useState } from "react";
// import { api, unwrap } from "../services/api";


// export default function Register() {
// const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
// const [loading, setLoading] = useState(false);
// const [error, setError] = useState("");
// const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));


// const submit = async (e) => {
// e.preventDefault(); setError(""); setLoading(true);
// if (form.password !== form.confirm) { setError("Passwords do not match"); setLoading(false); return; }
// const [data, err] = await unwrap(api.post("/users/register", { name: form.name, email: form.email, password: form.password }));
// setLoading(false);
// setError(err?.message || (data ? "Registered! Please login." : ""));
// };


// return (
// <div className="container-narrow max-w-lg">
// <h2 className="mt-8 text-2xl font-bold text-slate-800">Create your account</h2>
// <form onSubmit={submit} className="mt-6 grid gap-4 card p-6">
// <div className="floating">
// <input name="name" value={form.name} onChange={onChange} placeholder=" " required />
// <label>Name</label>
// </div>
// <div className="floating">
// <input type="email" name="email" value={form.email} onChange={onChange} placeholder=" " required />
// <label>Email</label>
// </div>
// <div className="floating">
// <input type="password" name="password" value={form.password} onChange={onChange} placeholder=" " required />
// <label>Password</label>
// </div>
// <div className="floating">
// <input type="password" name="confirm" value={form.confirm} onChange={onChange} placeholder=" " required />
// <label>Confirm Password</label>
// </div>
// {error && <p className="text-sm text-rose-600">{error}</p>}
// <button disabled={loading} className="btn btn-primary">{loading ? "Please wait…" : "Register"}</button>
// </form>
// </div>
// );
// }
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api, unwrap } from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const [data, err] = await unwrap(
      api.post("/users/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      })
    );

    setLoading(false);

    if (err) {
      setError(err?.detail || err?.message || "Registration failed");
    } else {
      setSuccess("Account created! Redirecting to login...");
      // Auto-navigate to login page after 2 seconds
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  return (
    <div className="container-narrow max-w-lg">
      <h2 className="mt-8 text-2xl font-bold text-slate-800">
        Create your account
      </h2>
      <form onSubmit={submit} className="mt-6 grid gap-4 card p-6">
        <div className="floating">
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder=" "
            required
          />
          <label>Name</label>
        </div>
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
        <div className="floating">
          <input
            type="password"
            name="confirm"
            value={form.confirm}
            onChange={onChange}
            placeholder=" "
            required
          />
          <label>Confirm Password</label>
        </div>
        {error && <p className="text-sm text-rose-600">{error}</p>}
        {success && (
          <p className="text-sm text-emerald-600">
            {success}{" "}
            <Link to="/login" className="text-teal-700 hover:underline">
              Login
            </Link>
          </p>
        )}
        <button disabled={loading} className="btn btn-primary">
          {loading ? "Please wait…" : "Register"}
        </button>
      </form>
    </div>
  );
}
