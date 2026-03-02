// lib/github/client.ts
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const ORG = process.env.GITHUB_ORG!;

export async function createSiteRepo(siteId: string, siteName: string) {
  const repoName = `josett-site-${siteId}`;
  const { data } = await octokit.repos.createInOrg({
    org: ORG,
    name: repoName,
    private: true,
    description: `Josett managed site: ${siteName}`,
    auto_init: true,
  });
  return { repoName, repoUrl: data.html_url };
}

export async function pushFilesToRepo(
  repoName: string,
  files: Record<string, string>,
  commitMessage = "Deploy from Josett Builder"
) {
  const { data: ref } = await octokit.git.getRef({
    owner: ORG,
    repo: repoName,
    ref: "heads/main",
  });

  const blobs = await Promise.all(
    Object.entries(files).map(async ([path, content]) => {
      const { data } = await octokit.git.createBlob({
        owner: ORG,
        repo: repoName,
        content: Buffer.from(content).toString("base64"),
        encoding: "base64",
      });
      return { path, sha: data.sha };
    })
  );

  const { data: tree } = await octokit.git.createTree({
    owner: ORG,
    repo: repoName,
    tree: blobs.map((b) => ({
      path: b.path,
      mode: "100644" as const,
      type: "blob" as const,
      sha: b.sha,
    })),
    base_tree: ref.object.sha,
  });

  const { data: commit } = await octokit.git.createCommit({
    owner: ORG,
    repo: repoName,
    message: commitMessage,
    tree: tree.sha,
    parents: [ref.object.sha],
  });

  await octokit.git.updateRef({
    owner: ORG,
    repo: repoName,
    ref: "heads/main",
    sha: commit.sha,
  });

  return commit.sha;
}

export async function deleteSiteRepo(repoName: string) {
  try {
    await octokit.repos.delete({ owner: ORG, repo: repoName });
  } catch (error) {
    console.error("Failed to delete repo:", error);
  }
}
