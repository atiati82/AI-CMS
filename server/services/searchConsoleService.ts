import { searchconsole } from "@googleapis/searchconsole";
import { GoogleAuth } from "google-auth-library";

interface SearchAnalyticsRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface SearchAnalyticsResponse {
  rows: SearchAnalyticsRow[];
  responseAggregationType?: string;
}

interface UrlInspectionResult {
  inspectionResult?: {
    indexStatusResult?: {
      verdict?: string;
      coverageState?: string;
      robotsTxtState?: string;
      indexingState?: string;
      lastCrawlTime?: string;
      pageFetchState?: string;
      googleCanonical?: string;
      userCanonical?: string;
      referringUrls?: string[];
    };
    mobileUsabilityResult?: {
      verdict?: string;
      issues?: Array<{
        issueType?: string;
        severity?: string;
        message?: string;
      }>;
    };
    richResultsResult?: {
      verdict?: string;
      detectedItems?: Array<{
        richResultType?: string;
        items?: Array<{ name?: string; value?: string }>;
      }>;
    };
  };
}

interface SiteInfo {
  siteUrl: string;
  permissionLevel?: string;
}

class SearchConsoleService {
  private client: ReturnType<typeof searchconsole> | null = null;
  private initialized = false;

  private getCredentials() {
    const clientEmail = process.env.GSC_CLIENT_EMAIL;
    const privateKey = process.env.GSC_PRIVATE_KEY;
    const siteUrl = process.env.GSC_SITE_URL;

    if (!clientEmail || !privateKey) {
      return null;
    }

    return {
      clientEmail,
      privateKey: privateKey.replace(/\\n/g, "\n"),
      siteUrl: siteUrl || "",
    };
  }

  async initialize(): Promise<boolean> {
    if (this.initialized && this.client) {
      return true;
    }

    const credentials = this.getCredentials();
    if (!credentials) {
      console.log("[GSC] Missing credentials - GSC features disabled");
      return false;
    }

    try {
      const auth = new GoogleAuth({
        credentials: {
          client_email: credentials.clientEmail,
          private_key: credentials.privateKey,
        },
        scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
      });

      this.client = searchconsole({
        version: "v1",
        auth,
      });

      this.initialized = true;
      console.log("[GSC] Service initialized successfully");
      return true;
    } catch (error) {
      console.error("[GSC] Failed to initialize:", error);
      return false;
    }
  }

  isConfigured(): boolean {
    const credentials = this.getCredentials();
    return !!(credentials?.clientEmail && credentials?.privateKey);
  }

  async listSites(): Promise<SiteInfo[]> {
    if (!await this.initialize()) {
      throw new Error("Google Search Console not configured");
    }

    try {
      const response = await this.client!.sites.list({});
      return (response.data.siteEntry || []).map((site) => ({
        siteUrl: site.siteUrl || "",
        permissionLevel: site.permissionLevel || "unknown",
      }));
    } catch (error: any) {
      console.error("[GSC] Error listing sites:", error);
      throw new Error(`Failed to list sites: ${error.message}`);
    }
  }

  async getSearchAnalytics(params: {
    siteUrl?: string;
    startDate: string;
    endDate: string;
    dimensions?: string[];
    rowLimit?: number;
    filters?: Array<{
      dimension: string;
      operator: string;
      expression: string;
    }>;
  }): Promise<SearchAnalyticsResponse> {
    if (!await this.initialize()) {
      throw new Error("Google Search Console not configured");
    }

    const siteUrl = params.siteUrl || process.env.GSC_SITE_URL;
    if (!siteUrl) {
      throw new Error("Site URL not specified");
    }

    try {
      const requestBody: any = {
        startDate: params.startDate,
        endDate: params.endDate,
        dimensions: params.dimensions || ["query", "page"],
        rowLimit: params.rowLimit || 100,
      };

      if (params.filters && params.filters.length > 0) {
        requestBody.dimensionFilterGroups = [
          {
            filters: params.filters,
          },
        ];
      }

      const response = await this.client!.searchanalytics.query({
        siteUrl,
        requestBody,
      });

      return {
        rows: (response.data.rows || []).map((row) => ({
          keys: row.keys || [],
          clicks: row.clicks || 0,
          impressions: row.impressions || 0,
          ctr: row.ctr || 0,
          position: row.position || 0,
        })),
        responseAggregationType: response.data.responseAggregationType || undefined,
      };
    } catch (error: any) {
      console.error("[GSC] Error fetching analytics:", error);
      throw new Error(`Failed to fetch search analytics: ${error.message}`);
    }
  }

  async getTopQueries(days: number = 28, limit: number = 50): Promise<SearchAnalyticsRow[]> {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const response = await this.getSearchAnalytics({
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      dimensions: ["query"],
      rowLimit: limit,
    });

    return response.rows.sort((a, b) => b.clicks - a.clicks);
  }

  async getTopPages(days: number = 28, limit: number = 50): Promise<SearchAnalyticsRow[]> {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const response = await this.getSearchAnalytics({
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      dimensions: ["page"],
      rowLimit: limit,
    });

    return response.rows.sort((a, b) => b.clicks - a.clicks);
  }

  async getPerformanceByDate(days: number = 28): Promise<SearchAnalyticsRow[]> {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const response = await this.getSearchAnalytics({
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      dimensions: ["date"],
      rowLimit: days,
    });

    return response.rows.sort((a, b) => a.keys[0].localeCompare(b.keys[0]));
  }

  async inspectUrl(url: string, siteUrl?: string): Promise<UrlInspectionResult> {
    if (!await this.initialize()) {
      throw new Error("Google Search Console not configured");
    }

    const site = siteUrl || process.env.GSC_SITE_URL;
    if (!site) {
      throw new Error("Site URL not specified");
    }

    try {
      const response = await this.client!.urlInspection.index.inspect({
        requestBody: {
          inspectionUrl: url,
          siteUrl: site,
        },
      });

      return response.data as UrlInspectionResult;
    } catch (error: any) {
      console.error("[GSC] Error inspecting URL:", error);
      throw new Error(`Failed to inspect URL: ${error.message}`);
    }
  }

  async getSummaryStats(days: number = 28): Promise<{
    totalClicks: number;
    totalImpressions: number;
    averageCtr: number;
    averagePosition: number;
    topQuery: string;
    topPage: string;
    dataByDate: Array<{
      date: string;
      clicks: number;
      impressions: number;
    }>;
  }> {
    const [queries, pages, byDate] = await Promise.all([
      this.getTopQueries(days, 1),
      this.getTopPages(days, 1),
      this.getPerformanceByDate(days),
    ]);

    const totals = byDate.reduce(
      (acc, row) => ({
        clicks: acc.clicks + row.clicks,
        impressions: acc.impressions + row.impressions,
        ctrSum: acc.ctrSum + row.ctr,
        positionSum: acc.positionSum + row.position,
        count: acc.count + 1,
      }),
      { clicks: 0, impressions: 0, ctrSum: 0, positionSum: 0, count: 0 }
    );

    return {
      totalClicks: totals.clicks,
      totalImpressions: totals.impressions,
      averageCtr: totals.count > 0 ? totals.ctrSum / totals.count : 0,
      averagePosition: totals.count > 0 ? totals.positionSum / totals.count : 0,
      topQuery: queries[0]?.keys[0] || "N/A",
      topPage: pages[0]?.keys[0] || "N/A",
      dataByDate: byDate.map((row) => ({
        date: row.keys[0],
        clicks: row.clicks,
        impressions: row.impressions,
      })),
    };
  }
}

export const searchConsoleService = new SearchConsoleService();
