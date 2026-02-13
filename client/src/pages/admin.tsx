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
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, RefreshCw, Users, Clock, CheckCircle2, ArrowLeft, Car, Truck } from "lucide-react";
import { Link } from "wouter";
import type { Lead } from "@shared/schema";
import { leadStatuses } from "@shared/schema";

const statusColors: Record<string, string> = {
  "New Lead": "bg-blue-500/20 text-blue-400",
  "Sale Closed": "bg-indigo-500/20 text-indigo-400",
  "Claim Initiated": "bg-violet-500/20 text-violet-400",
  "RA Signed": "bg-purple-500/20 text-purple-400",
  "Loaner Assigned": "bg-fuchsia-500/20 text-fuchsia-400",
  "Vehicle In Shop": "bg-pink-500/20 text-pink-400",
  "Scoped": "bg-rose-500/20 text-rose-400",
  "Estimate Sent": "bg-amber-500/20 text-amber-400",
  "First Look": "bg-yellow-500/20 text-yellow-400",
  "Supplement Submitted": "bg-orange-500/20 text-orange-400",
  "Awaiting Approval": "bg-red-500/20 text-red-400",
  "Approved": "bg-lime-500/20 text-lime-400",
  "R&I": "bg-teal-500/20 text-teal-400",
  "PDR": "bg-cyan-500/20 text-cyan-400",
  "QC 1": "bg-sky-500/20 text-sky-400",
  "Reinstall": "bg-blue-500/20 text-blue-400",
  "QC 2": "bg-sky-500/20 text-sky-400",
  "Detail": "bg-emerald-500/20 text-emerald-400",
  "Ready for Delivery": "bg-green-500/20 text-green-400",
  "Delivered": "bg-green-600/20 text-green-300",
  "Closed": "bg-gray-500/20 text-gray-400",
};

const filterGroups = [
  { label: "All", value: "all" },
  { label: "Pre-Repair", values: ["New Lead", "Sale Closed", "Claim Initiated", "RA Signed", "Loaner Assigned"] },
  { label: "In Process", values: ["Vehicle In Shop", "Scoped", "Estimate Sent", "First Look", "Supplement Submitted", "Awaiting Approval", "Approved"] },
  { label: "Repair", values: ["R&I", "PDR", "QC 1", "Reinstall", "QC 2", "Detail"] },
  { label: "Complete", values: ["Ready for Delivery", "Delivered", "Closed"] },
];

export default function Admin() {
  const [activeGroup, setActiveGroup] = useState("all");

  const { data: leads = [], isLoading } = useQuery<Lead[]>({
    queryKey: ["/api/leads"],
  });

  const updateLead = useMutation({
    mutationFn: async ({ id, ...data }: { id: number; [key: string]: any }) => {
      await apiRequest("PATCH", `/api/leads/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
    },
  });

  const activeFilter = filterGroups.find((g) =>
    "value" in g ? g.value === activeGroup : g.label === activeGroup
  );

  const filtered =
    activeGroup === "all"
      ? leads
      : leads.filter((l) => {
          const group = filterGroups.find((g) => g.label === activeGroup);
          return group && "values" in group && group.values.includes(l.status);
        });

  const counts = {
    total: leads.length,
    new: leads.filter((l) => l.status === "New Lead").length,
    active: leads.filter((l) => {
      const inProcess = filterGroups.find((g) => g.label === "In Process");
      const repair = filterGroups.find((g) => g.label === "Repair");
      const statuses = [
        ...((inProcess && "values" in inProcess) ? inProcess.values : []),
        ...((repair && "values" in repair) ? repair.values : []),
      ];
      return statuses.includes(l.status);
    }).length,
    completed: leads.filter((l) => ["Delivered", "Closed"].includes(l.status)).length,
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
            { label: "New Leads", value: counts.new, icon: Clock },
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

        <div className="flex flex-wrap items-center gap-2 mb-6">
          {filterGroups.map((group) => {
            const key = "value" in group ? group.value : group.label;
            const isActive = activeGroup === key;
            return (
              <Button
                key={key}
                variant={isActive ? "default" : "secondary"}
                className={isActive ? "bg-[#FF192C] text-white border-[#FF192C]" : ""}
                onClick={() => setActiveGroup(key!)}
                data-testid={`button-filter-${key}`}
              >
                {group.label}
              </Button>
            );
          })}
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
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="text-[#F5F5F7] font-semibold text-sm">
                        {lead.name}
                      </span>
                      <Badge
                        className={`${statusColors[lead.status] || "bg-gray-500/20 text-gray-400"} text-xs border-0 no-default-hover-elevate no-default-active-elevate`}
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

                    <div className="flex flex-wrap items-center gap-4 mt-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={lead.loanerRequested ?? false}
                          onCheckedChange={(checked) =>
                            updateLead.mutate({ id: lead.id, loanerRequested: !!checked })
                          }
                          className="border-white/20 data-[state=checked]:bg-[#FF192C] data-[state=checked]:border-[#FF192C]"
                          data-testid={`checkbox-loaner-${lead.id}`}
                        />
                        <span className="text-xs text-[#B3B3B8]/60 flex items-center gap-1">
                          <Car className="w-3 h-3" /> Loaner
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={lead.pickupRequested ?? false}
                          onCheckedChange={(checked) =>
                            updateLead.mutate({ id: lead.id, pickupRequested: !!checked })
                          }
                          className="border-white/20 data-[state=checked]:bg-[#FF192C] data-[state=checked]:border-[#FF192C]"
                          data-testid={`checkbox-pickup-${lead.id}`}
                        />
                        <span className="text-xs text-[#B3B3B8]/60 flex items-center gap-1">
                          <Truck className="w-3 h-3" /> Pickup
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={lead.insuranceApproved ?? false}
                          onCheckedChange={(checked) =>
                            updateLead.mutate({ id: lead.id, insuranceApproved: !!checked })
                          }
                          className="border-white/20 data-[state=checked]:bg-[#FF192C] data-[state=checked]:border-[#FF192C]"
                          data-testid={`checkbox-insurance-${lead.id}`}
                        />
                        <span className="text-xs text-[#B3B3B8]/60">
                          Ins. Approved
                          {lead.insuranceApproved && lead.insuranceApprovalTimestamp && (
                            <span className="ml-1 text-[#B3B3B8]/30">
                              ({new Date(lead.insuranceApprovalTimestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" })})
                            </span>
                          )}
                        </span>
                      </label>
                    </div>

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
                        updateLead.mutate({ id: lead.id, status })
                      }
                    >
                      <SelectTrigger
                        className="w-[180px] bg-[#0B0B0D] border-white/10 text-[#F5F5F7] text-xs"
                        data-testid={`select-status-${lead.id}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#141416] border-white/10 max-h-[300px]">
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
