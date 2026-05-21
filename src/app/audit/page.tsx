import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Scissors, FileSearch, ArrowRight } from "lucide-react";

export default function ForensicAudit() {
  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">HITL Approval Queue</h2>
          <p className="text-muted-foreground text-sm">Review, Prune, or Flag reports before the 06:00 AM distribution window.</p>
        </div>
        <Badge variant="outline" className="h-6">4 Pending</Badge>
      </div>

      {/* Focus Item: The Conflict */}
      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <CardTitle className="text-lg">Truth Conflict: Sovereign Alpha Ledger</CardTitle>
            </div>
            <Badge variant="destructive" className="uppercase font-bold tracking-widest text-[10px]">Action Required</Badge>
          </div>
          <CardDescription className="text-destructive/80">
            VMF-2 Forensic Auditor returned a Confidence Score of 72% (Threshold: 75%).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-md bg-black/40 border border-border/50 font-mono text-sm text-muted-foreground">
            <p className="text-foreground mb-2">TARGETED RE-SCRAPE LOG:</p>
            <p>Attempt 1 [2026-05-21 08:45:15]: SEC RSS Feed... <span className="text-destructive">Failed (No new docket)</span></p>
            <p>Attempt 2 [2026-05-21 08:55:15]: PACER Query... <span className="text-destructive">Failed (Sealed)</span></p>
            <p>Attempt 3 [2026-05-21 09:05:15]: Treasury API... <span className="text-destructive">Failed (Timeout)</span></p>
            <p className="text-primary mt-2">» Max attempts reached. Human resolution required.</p>
          </div>
          
          <div className="p-4 rounded-md border border-destructive/30 bg-background/50 relative">
            <div className="absolute top-0 right-0 bg-destructive text-destructive-foreground text-[9px] font-bold px-2 py-1 rounded-bl-md uppercase">Conflict Text</div>
            <p className="text-sm leading-relaxed pt-2">
              The recent surge in XLS-66 institutional adoption is <span className="bg-destructive/20 text-destructive-foreground px-1 rounded line-through decoration-destructive">expected to be followed by a formal regulatory safe-harbor declaration from the SEC by Q3 2026</span>, driving further liquidity into the AMM pools.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 border-t border-border/10 pt-4 bg-background/20">
          <Button variant="outline" className="flex-1 border-destructive/30 hover:bg-destructive/10 text-destructive">
            <FileSearch className="mr-2 h-4 w-4" />
            Flag as Inconclusive
          </Button>
          <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
            <Scissors className="mr-2 h-4 w-4" />
            Surgically Prune & Approve
          </Button>
        </CardFooter>
      </Card>

      {/* Clean Queue */}
      <h3 className="text-lg font-semibold border-b pb-2 mt-4">Verified Pipeline</h3>
      <div className="grid gap-4">
        {[
          { title: "Infrastructure Report+", tier: "L2_PLUS", score: "98%" },
          { title: "Regulatory Moat Brief", tier: "L1_CORE", score: "94%" },
          { title: "Influencer Hub Media Kit", tier: "INFLUENCER", score: "99%" },
        ].map((report, i) => (
          <Card key={i} className="bg-card/30">
            <CardHeader className="p-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-md">{report.title}</CardTitle>
                <CardDescription className="text-xs uppercase tracking-wider mt-1">{report.tier} • Score: <span className="text-green-500 font-bold">{report.score}</span></CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8">Review</Button>
                <Button size="sm" className="h-8 bg-green-600/20 text-green-500 hover:bg-green-600/30 border border-green-600/50">
                  <CheckCircle className="mr-2 h-3 w-3" /> Approve
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
