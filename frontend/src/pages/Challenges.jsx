import { useEffect, useState } from "react";
import { Panel, Progress } from "../components/Card";
import { api, unwrap } from "../services/api";

export default function Challenges() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Fetch current user
  useEffect(() => {
    (async () => {
      const [userData, userErr] = await unwrap(api.get("/users/me"));
      if (userErr) {
        console.error("Error fetching current user:", userErr);
      } else if (userData) {
        setCurrentUserId(userData.id);
      }
    })();
  }, []);

  // Fetch challenges after current user is known
  useEffect(() => {
    if (!currentUserId) return;

    (async () => {
      const [data, err] = await unwrap(api.get("/challenges"));
      if (err) {
        console.error("Error fetching challenges:", err);
      } else if (data && data.length > 0) {
        const mapped = data.map((c) => ({
          ...c,
          joined: c.participants.includes(currentUserId),
          progress: 0, // optionally, compute based on user's saved liters
        }));
        setList(mapped);
      } else {
        setList([]);
      }
      setLoading(false);
    })();
  }, [currentUserId]);

  // Join a challenge
  const join = async (id) => {
    const [data, err] = await unwrap(api.post(`/challenges/join/${id}`));
    if (err) {
      console.error("Error joining challenge:", err);
      return;
    }

    // Update local state to mark as joined
    setList((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, joined: true, participants: [...c.participants, currentUserId] }
          : c
      )
    );
  };

  if (loading) {
    return (
      <div className="container-narrow">
        <h2 className="mt-6 text-2xl font-bold">Challenges</h2>
        <p className="text-slate-500 mt-4">Loading challenges...</p>
      </div>
    );
  }

  return (
    <div className="container-narrow">
      <h2 className="mt-6 text-2xl font-bold">Challenges</h2>
      <div className="mt-4 grid gap-5 md:grid-cols-2">
        {list.length > 0 ? (
          list.map((c) => (
            <Panel key={c.id}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{c.title}</h3>
                  <p className="text-slate-600">{c.description || "No description"}</p>
                </div>
                <span className="rounded-full bg-teal-50 px-3 py-1 text-xs text-teal-700">
                  Goal: {c.target_liters}L
                </span>
              </div>
              <div className="mt-3">
                <Progress value={c.progress} />
                <div className="mt-1 text-right text-xs text-slate-500">
                  {c.progress}% completed ({c.participants.length} joined)
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => join(c.id)}
                  className="btn btn-primary"
                  disabled={c.joined}
                >
                  {c.joined ? "Joined" : "Join Challenge"}
                </button>
              </div>
            </Panel>
          ))
        ) : (
          <p className="text-slate-500 col-span-2">No challenges found.</p>
        )}
      </div>
    </div>
  );
}
