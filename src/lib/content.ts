import type { Site, Service } from "./types";
import siteJson from "@/../content/site.json";
import servicesJson from "@/../content/services.json";

export async function getSite(): Promise<Site> {
  return siteJson as Site;
}
export async function getServices(): Promise<Service[]> {
  return servicesJson as Service[];
}
