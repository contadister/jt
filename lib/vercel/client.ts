// lib/vercel/client.ts
const VERCEL_TOKEN = process.env.VERCEL_TOKEN!;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;
const BASE = "https://api.vercel.com";

function teamQuery() {
  return VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : "";
}

async function vercelRequest<T>(
  path: string,
  method = "GET",
  body?: Record<string, unknown>
): Promise<T> {
  const res = await fetch(`${BASE}${path}${teamQuery()}`, {
    method,
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Vercel API error: ${err}`);
  }
  return res.json() as Promise<T>;
}

export async function createVercelProject(
  projectName: string,
  repoName: string,
  githubOrg: string
): Promise<{ id: string; name: string }> {
  return vercelRequest("/v9/projects", "POST", {
    name: projectName,
    gitRepository: {
      type: "github",
      repo: `${githubOrg}/${repoName}`,
    },
    framework: "nextjs",
    publicSource: false,
  });
}

export async function triggerDeployment(projectId: string): Promise<{ id: string; url: string }> {
  return vercelRequest(`/v13/deployments`, "POST", {
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
  return vercelRequest(`/v13/deployments/${deploymentId}`);
}

export async function suspendProject(projectId: string): Promise<void> {
  await vercelRequest(`/v9/projects/${projectId}`, "PATCH", {
    autoExposeSystemEnvs: false,
  });
}

export async function deleteVercelProject(projectId: string): Promise<void> {
  await vercelRequest(`/v9/projects/${projectId}`, "DELETE");
}

export async function addEnvToProject(
  projectId: string,
  envVars: { key: string; value: string; target: string[] }[]
): Promise<void> {
  await vercelRequest(`/v10/projects/${projectId}/env`, "POST", envVars as unknown as Record<string, unknown>);
}
