"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useBuilderStore } from "@/store/builderStore";
import { BuilderShell } from "@/components/builder/BuilderShell";
import { Loader2 } from "lucide-react";

export default function BuilderPage() {
  const params = useParams();
  const router = useRouter();
  const siteId = params.siteId as string;
  const { loadBuilderJson } = useBuilderStore();
  const [loading, setLoading] = useState(true);
  const [siteName, setSiteName] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/sites/${siteId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setError(data.error); return; }
        setSiteName(data.name);
        if (data.builderJson) {
          loadBuilderJson(data.builderJson);
        }
        setLoading(false);
      })
      .catch(() => setError("Could not load site"));
  }, [siteId, loadBuilderJson]);

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button onClick={() => router.push("/sites")} className="text-josett-400 underline">Back to Sites</button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <Loader2 size={40} className="text-josett-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading builder...</p>
        </div>
      </div>
    );
  }

  return <BuilderShell siteId={siteId} siteName={siteName} />;
}
