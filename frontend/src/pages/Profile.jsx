// import { useEffect, useState } from "react";
// import { api, unwrap } from "../services/api";


// export default function Profile() {
// const [user, setUser] = useState({ name: "User", email: "user@example.com" });
// const [pwd, setPwd] = useState({ current: "", next: "" });


// useEffect(() => {
// (async () => {
// const [data] = await unwrap(api.get("/users/me"));
// if (data) setUser(data);
// })();
// }, []);


// const save = async () => {
// await unwrap(api.post("/users/update", { name: user.name }));
// };
// const changePwd = async () => {
// await unwrap(api.post("/users/change-password", pwd));
// setPwd({ current: "", next: "" });
// };


// return (
// <div className="container-narrow max-w-2xl">
// <h2 className="mt-6 text-2xl font-bold">Profile</h2>
// <div className="mt-4 grid gap-6 md:grid-cols-2">
// <div className="card p-5">
// <h3 className="mb-3 font-semibold">Account</h3>
// <label className="label">Name</label>
// <input className="input" value={user.name} onChange={(e)=>setUser({...user, name:e.target.value})} />
// <label className="label mt-3">Email</label>
// <input className="input" value={user.email} readOnly />
// <button onClick={save} className="btn btn-primary mt-4">Save</button>
// </div>
// <div className="card p-5">
// <h3 className="mb-3 font-semibold">Password</h3>
// <label className="label">Current Password</label>
// <input type="password" className="input" value={pwd.current} onChange={(e)=>setPwd({...pwd, current:e.target.value})} />
// <label className="label mt-3">New Password</label>
// <input type="password" className="input" value={pwd.next} onChange={(e)=>setPwd({...pwd, next:e.target.value})} />
// <button onClick={changePwd} className="btn btn-primary mt-4">Update Password</button>
// </div>
// </div>
// </div>
// );
// }
import { useEffect, useState } from "react";
import { api, unwrap } from "../services/api";

export default function Profile() {
  const [user, setUser] = useState({ name: "User", email: "user@example.com" });
  const [pwd, setPwd] = useState({ current: "", next: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Fetch current user info
  useEffect(() => {
    (async () => {
      const [data, err] = await unwrap(api.get("/users/me"));
      if (data) setUser(data);
      if (err) setMsg(err?.detail || err?.message || "Failed to fetch profile");
    })();
  }, []);

  // Save profile updates (name)
  const save = async () => {
    setLoading(true);
    setMsg("");
    const [data, err] = await unwrap(api.post("/users/update", { name: user.name }));
    setLoading(false);
    if (err) setMsg(err?.detail || err?.message || "Failed to save profile");
    else setMsg("Profile updated successfully!");
  };

  // Change password
  const changePwd = async () => {
    if (!pwd.current || !pwd.next) {
      setMsg("Please fill both password fields");
      return;
    }
    setLoading(true);
    setMsg("");
    const [data, err] = await unwrap(api.post("/users/change-password", pwd));
    setLoading(false);
    if (err) setMsg(err?.detail || err?.message || "Failed to change password");
    else {
      setMsg("Password updated successfully!");
      setPwd({ current: "", next: "" });
    }
  };

  return (
    <div className="container-narrow max-w-2xl">
      <h2 className="mt-6 text-2xl font-bold">Profile</h2>
      {msg && <p className="mt-2 text-sm text-emerald-600">{msg}</p>}

      <div className="mt-4 grid gap-6 md:grid-cols-2">
        {/* Account Info */}
        <div className="card p-5">
          <h3 className="mb-3 font-semibold">Account</h3>
          <label className="label">Name</label>
          <input
            className="input"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <label className="label mt-3">Email</label>
          <input className="input" value={user.email} readOnly />
          <button
            onClick={save}
            className="btn btn-primary mt-4"
            disabled={loading}
          >
            {loading ? "Saving…" : "Save"}
          </button>
        </div>

        {/* Password Change */}
        <div className="card p-5">
          <h3 className="mb-3 font-semibold">Password</h3>
          <label className="label">Current Password</label>
          <input
            type="password"
            className="input"
            value={pwd.current}
            onChange={(e) => setPwd({ ...pwd, current: e.target.value })}
          />
          <label className="label mt-3">New Password</label>
          <input
            type="password"
            className="input"
            value={pwd.next}
            onChange={(e) => setPwd({ ...pwd, next: e.target.value })}
          />
          <button
            onClick={changePwd}
            className="btn btn-primary mt-4"
            disabled={loading}
          >
            {loading ? "Updating…" : "Update Password"}
          </button>
        </div>
      </div>
    </div>
  );
}
