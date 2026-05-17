import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Activity, FileCheck, AlertTriangle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      {/* Top Stats - Bento Style */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Integrity</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-muted-foreground">Phase 0 Vault Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Monitoring</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">XRPL</div>
            <p className="text-xs text-muted-foreground">Ledger #104,275,519</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approval Queue</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Pending Forensic Audit</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Truth Conflicts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Targeted Re-scrape Active</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Intelligence Reports</CardTitle>
            <CardDescription>
              Staged forensic reports awaiting your final manual review.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Sovereign Alpha Ledger", tier: "L3_CORE", status: "Conflict", time: "2h ago" },
                { title: "Infrastructure Report+", tier: "L2_PLUS", status: "Clean", time: "4h ago" },
                { title: "Regulatory Moat Brief", tier: "L1_CORE", status: "Clean", time: "5h ago" },
              ].map((report, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{report.title}</p>
                    <p className="text-xs text-muted-foreground">{report.tier} • Generated {report.time}</p>
                  </div>
                  <Badge variant={report.status === "Conflict" ? "destructive" : "secondary"}>
                    {report.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>System Log</CardTitle>
            <CardDescription>Real-time audit of VMF operations.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs font-mono space-y-2 text-muted-foreground">
              <p>[08:42:01] Ingestion: Ledger #104275519 Verified.</p>
              <p>[08:45:12] VMF-2: Truth Threshold 72% - Conflict Flagged.</p>
              <p>[08:45:15] Re-scrape: Attempt 1 of 3 Initialized.</p>
              <p>[08:45:16] Scanning SEC RSS Feed...</p>
              <p className="text-green-500 animate-pulse">_Waiting for distribution window...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
