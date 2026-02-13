import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, RefreshCw, Users, Clock, CheckCircle2, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import type { Lead } from "@shared/schema";
import { leadStatuses } from "@shared/schema";

const statusColors: Record<string, string> = {
  New: "bg-blue-500/20 text-blue-400",
  Contacted: "bg-yellow-500/20 text-yellow-400",
  Scheduled: "bg-purple-500/20 text-purple-400",
  "In Repair": "bg-orange-500/20 text-orange-400",
  QC: "bg-cyan-500/20 text-cyan-400",
  Completed: "bg-green-500/20 text-green-400",
  Delivered: "bg-emerald-500/20 text-emerald-400",
  Closed: "bg-gray-500/20 text-gray-400",
};

export default function Admin() {
  const [filter, setFilter] = useState<string>("all");

  const { data: leads = [], isLoading } = useQuery<Lead[]>({
    queryKey: ["/api/leads"],
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      await apiRequest("PATCH", `/api/leads/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
    },
  });

  const filtered = filter === "all" ? leads : leads.filter((l) => l.status === filter);

  const counts = {
    total: leads.length,
    new: leads.filter((l) => l.status === "New").length,
    active: leads.filter((l) => ["Scheduled", "In Repair", "QC"].includes(l.status)).length,
    completed: leads.filter((l) => ["Completed", "Delivered", "Closed"].includes(l.status)).length,
  };

  return (
    <div className="bg-[#0B0B0D] min-h-screen pt-24 lg:pt-32">
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon" data-testid="button-admin-back">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#FF192C] font-semibold mb-1">
              Admin
            </p>
            <h1 className="text-2xl font-bold text-[#F5F5F7] uppercase tracking-tight" data-testid="text-admin-headline">
              Lead Management
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Leads", value: counts.total, icon: Users },
            { label: "New", value: counts.new, icon: Clock },
            { label: "Active", value: counts.active, icon: RefreshCw },
            { label: "Completed", value: counts.completed, icon: CheckCircle2 },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-5 rounded-md bg-[#141416] border border-white/5"
              data-testid={`stat-admin-${i}`}
            >
              <stat.icon className="w-4 h-4 text-[#B3B3B8]/50 mb-3" />
              <div className="text-2xl font-bold text-[#F5F5F7]">{stat.value}</div>
              <div className="text-xs text-[#B3B3B8]/50 uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Button
            variant={filter === "all" ? "default" : "secondary"}
            className={filter === "all" ? "bg-[#FF192C] text-white border-[#FF192C]" : ""}
            onClick={() => setFilter("all")}
            data-testid="button-filter-all"
          >
            All
          </Button>
          {leadStatuses.map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "secondary"}
              className={filter === status ? "bg-[#FF192C] text-white border-[#FF192C]" : ""}
              onClick={() => setFilter(status)}
              data-testid={`button-filter-${status.toLowerCase().replace(" ", "-")}`}
            >
              {status}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-[#FF192C] animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20" data-testid="text-no-leads">
            <p className="text-[#B3B3B8]/50 text-sm">No leads found.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((lead) => (
              <div
                key={lead.id}
                className="p-5 rounded-md bg-[#141416] border border-white/5"
                data-testid={`card-lead-${lead.id}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="text-[#F5F5F7] font-semibold text-sm">
                        {lead.name}
                      </span>
                      <Badge
                        className={`${statusColors[lead.status] || ""} text-xs border-0 no-default-hover-elevate no-default-active-elevate`}
                        data-testid={`badge-status-${lead.id}`}
                      >
                        {lead.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-[#B3B3B8]/60">
                      <span>{lead.phone}</span>
                      <span>{lead.email}</span>
                      <span>{lead.vehicle}</span>
                      {lead.insurance && <span>{lead.insurance}</span>}
                    </div>
                    {lead.message && (
                      <p className="mt-2 text-xs text-[#B3B3B8]/40 truncate max-w-md">
                        {lead.message}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-[#B3B3B8]/30">
                      {new Date(lead.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    <Select
                      value={lead.status}
                      onValueChange={(status) =>
                        updateStatus.mutate({ id: lead.id, status })
                      }
                    >
                      <SelectTrigger
                        className="w-[160px] bg-[#0B0B0D] border-white/10 text-[#F5F5F7] text-xs"
                        data-testid={`select-status-${lead.id}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#141416] border-white/10">
                        {leadStatuses.map((status) => (
                          <SelectItem
                            key={status}
                            value={status}
                            className="text-[#F5F5F7] text-xs"
                          >
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
