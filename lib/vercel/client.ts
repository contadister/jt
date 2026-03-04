// lib/vercel/client.ts
const VERCEL_TOKEN = process.env.VERCEL_TOKEN!;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;
const BASE = "https://api.vercel.com";

function teamQuery(sep = "?") {
  return VERCEL_TEAM_ID ? `${sep}teamId=${VERCEL_TEAM_ID}` : "";
}

async function vercelRequest<T>(
  path: string,
  method = "GET",
  body?: unknown
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Vercel API error ${res.status}: ${err}`);
  }
  return res.json() as Promise<T>;
}

// ── Projects ─────────────────────────────────────────────────────────────────

export async function createVercelProject(
  projectName: string,
  repoName: string,
  githubOrg: string
): Promise<{ id: string; name: string }> {
  return vercelRequest(`/v9/projects${teamQuery()}`, "POST", {
    name: projectName,
    gitRepository: { type: "github", repo: `${githubOrg}/${repoName}` },
    framework: "nextjs",
    publicSource: false,
  });
}

export async function suspendProject(projectId: string): Promise<void> {
  await vercelRequest(`/v9/projects/${projectId}${teamQuery()}`, "PATCH", {
    live: false,
  });
}

export async function deleteVercelProject(projectId: string): Promise<void> {
  await vercelRequest(`/v9/projects/${projectId}${teamQuery()}`, "DELETE");
}

export async function addEnvToProject(
  projectId: string,
  envVars: { key: string; value: string; target: string[] }[]
): Promise<void> {
  await vercelRequest(`/v10/projects/${projectId}/env${teamQuery()}`, "POST", envVars);
}

// ── Deployments ───────────────────────────────────────────────────────────────

export async function triggerDeployment(
  projectId: string
): Promise<{ id: string; url: string }> {
  return vercelRequest(`/v13/deployments${teamQuery()}`, "POST", {
    name: projectId,
    project: projectId,
    target: "production",
  });
}

export async function getDeploymentStatus(deploymentId: string): Promise<{
  id: string;
  readyState: string;
  url: string;
}> {
  return vercelRequest(`/v13/deployments/${deploymentId}${teamQuery()}`);
}

// ── Domains ───────────────────────────────────────────────────────────────────

export async function addDomainToProject(
  projectId: string,
  domain: string
): Promise<{ name: string; verified: boolean }> {
  return vercelRequest(`/v10/projects/${projectId}/domains${teamQuery()}`, "POST", {
    name: domain,
  });
}

export async function getDomainStatus(
  projectId: string,
  domain: string
): Promise<{ name: string; verified: boolean; verification?: unknown[] }> {
  return vercelRequest(
    `/v10/projects/${projectId}/domains/${domain}${teamQuery()}`
  );
}

export async function getVercelDomain(
  projectId: string
): Promise<string | null> {
  try {
    const data = await vercelRequest<{ domains: { name: string }[] }>(
      `/v9/projects/${projectId}/domains${teamQuery()}`
    );
    const vercelDomain = data.domains?.find((d) =>
      d.name.endsWith(".vercel.app")
    );
    return vercelDomain?.name ?? null;
  } catch {
    return null;
  }
}

export async function removeDomainFromProject(
  projectId: string,
  domain: string
): Promise<void> {
  await vercelRequest(
    `/v9/projects/${projectId}/domains/${domain}${teamQuery()}`,
    "DELETE"
  );
}

// ── Default export (object with all methods) ──────────────────────────────────
// Some files import as: import Vercel from "@/lib/vercel/client"
// Others use named imports: import { suspendProject } from "@/lib/vercel/client"
// Both work with this setup.

const Vercel = {
  createVercelProject,
  suspendProject,
  deleteVercelProject,
  addEnvToProject,
  triggerDeployment,
  getDeploymentStatus,
  addDomainToProject,
  getDomainStatus,
  getVercelDomain,
  removeDomainFromProject,
};

export default Vercel;
