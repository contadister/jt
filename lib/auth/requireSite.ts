// lib/auth/requireSite.ts
// Gets the authenticated user AND verifies they own the given siteId in one call.

import { prisma } from "@/lib/prisma/client";
import { requireUser, type ReqUser } from "./requireUser";

export type SiteAuth = {
  user: ReqUser;
  site: { id: string; userId: string; status: string; slug: string; name: string };
};

export async function requireSite(req: Request, siteId: string): Promise<SiteAuth | null> {
  const user = await requireUser(req);
  if (!user) return null;

  const site = await prisma.site.findFirst({
    where: { id: siteId, userId: user.prismaId },
    select: { id: true, userId: true, status: true, slug: true, name: true },
  });
  if (!site) return null;

  return { user, site };
}
