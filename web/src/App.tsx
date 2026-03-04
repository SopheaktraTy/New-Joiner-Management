import { useEffect, useState } from "react";
import { fetchNewJoiners } from "./services/newJoiners.api";

export default function App() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchNewJoiners()
      .then(setData)
      .catch((e) => setError(e?.message || "Failed to load"));
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>{import.meta.env.VITE_APP_NAME}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <pre style={{ background: "#f6f6f6", padding: 12 }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}