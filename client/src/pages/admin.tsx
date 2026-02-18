import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  Users,
  FileText,
  Mail,
  BarChart3,
  Plus,
  Trash2,
  Send,
  Sparkles,
  LogOut,
  Eye,
  EyeOff,
  Search,
  Link2,
  ExternalLink,
  Copy,
  Zap,
  Globe,
  BookOpen,
  X,
  Archive,
  Share2,
  Settings,
  ToggleLeft,
  ToggleRight,
  Play,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  TrendingUp,
} from "lucide-react";
import { useLocation } from "wouter";
import type { Lead, Post, Subscriber, Newsletter, Topic, Webhook, WebhookLog } from "@shared/schema";
import { leadStatuses, webhookEvents } from "@shared/schema";

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

type TabKey = "dashboard" | "leads" | "blog" | "newsletter" | "users" | "integrations";

export default function Admin() {
  const { user, loading: authLoading, logout } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabKey>("dashboard");

  const [aiTopic, setAiTopic] = useState("");
  const [showAiForm, setShowAiForm] = useState(false);

  const [nlSubject, setNlSubject] = useState("");
  const [nlContent, setNlContent] = useState("");

  const [showAddUser, setShowAddUser] = useState(false);
  const [userForm, setUserForm] = useState({ name: "", email: "", password: "", role: "editor" });

  if (authLoading) {
    return (
      <div className="bg-[#0B0B0D] min-h-screen pt-24 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-[#FF192C] animate-spin" data-testid="loader-auth" />
      </div>
    );
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  const tabs: { key: TabKey; label: string; icon: typeof BarChart3 }[] = [
    { key: "dashboard", label: "Dashboard", icon: BarChart3 },
    { key: "leads", label: "Leads", icon: Users },
    { key: "blog", label: "Blog", icon: FileText },
    { key: "newsletter", label: "Newsletter", icon: Mail },
    ...(user.role === "root" || user.role === "admin" ? [{ key: "users" as TabKey, label: "Users", icon: Users }] : []),
    ...(user.role === "root" || user.role === "admin" ? [{ key: "integrations" as TabKey, label: "Integrations", icon: Zap }] : []),
  ];

  return (
    <div className="bg-[#0B0B0D] min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#FF192C] font-semibold mb-1">
              Admin Panel
            </p>
            <h1 className="text-2xl font-bold text-[#F5F5F7] uppercase tracking-tight" data-testid="text-admin-headline">
              Dent Society
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#B3B3B8]" data-testid="text-admin-user">{user.name}</span>
            <Badge className="bg-[#FF192C]/20 text-[#FF192C] border-0 no-default-hover-elevate no-default-active-elevate text-xs">
              {user.role}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={async () => { await logout(); navigate("/login"); }}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 text-[#B3B3B8]" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-white/5 pb-4">
          {tabs.map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "default" : "ghost"}
              className={activeTab === tab.key ? "bg-[#FF192C] text-white" : "text-[#B3B3B8]"}
              onClick={() => setActiveTab(tab.key)}
              data-testid={`tab-${tab.key}`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </Button>
          ))}
        </div>

        {activeTab === "dashboard" && <DashboardTab />}
        {activeTab === "leads" && <LeadsTab toast={toast} />}
        {activeTab === "blog" && (
          <BlogTab
            toast={toast}
            aiTopic={aiTopic}
            setAiTopic={setAiTopic}
            showAiForm={showAiForm}
            setShowAiForm={setShowAiForm}
            user={user}
          />
        )}
        {activeTab === "newsletter" && (
          <NewsletterTab
            toast={toast}
            nlSubject={nlSubject}
            setNlSubject={setNlSubject}
            nlContent={nlContent}
            setNlContent={setNlContent}
          />
        )}
        {activeTab === "users" && (user.role === "root" || user.role === "admin") && (
          <UsersTab
            toast={toast}
            showAddUser={showAddUser}
            setShowAddUser={setShowAddUser}
            userForm={userForm}
            setUserForm={setUserForm}
            currentUserId={user.id}
            currentUserRole={user.role}
          />
        )}
        {activeTab === "integrations" && (user.role === "root" || user.role === "admin") && (
          <IntegrationsTab toast={toast} />
        )}
      </div>
    </div>
  );
}

function DashboardTab() {
  const { data: stats, isLoading } = useQuery<{
    leads: { total: number };
    posts: { published: number };
    subscribers: { active: number };
    newsletters: { sent: number };
  }>({
    queryKey: ["/api/stats"],
  });

  const { data: backlinkAnalytics = [] } = useQuery<{ platform: string; clicks: number; backlinkCount: number }[]>({
    queryKey: ["/api/backlinks/analytics"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/backlinks/analytics", { credentials: "include" });
        if (!res.ok) return [];
        return res.json();
      } catch { return []; }
    },
  });

  const { data: sentimentSetting } = useQuery<{ key: string; value: string | null }>({
    queryKey: ["/api/settings", "sentiment_auto_survey"],
    queryFn: async () => {
      const res = await fetch("/api/settings/sentiment_auto_survey", { credentials: "include" });
      if (!res.ok) return { key: "sentiment_auto_survey", value: null };
      return res.json();
    },
  });

  const { data: ratingSummary } = useQuery<{
    total: number;
    average: number;
    distribution: { score: number; count: number }[];
  }>({
    queryKey: ["/api/ratings/summary"],
  });

  const { data: funnelData } = useQuery<{
    totalLeads: number;
    bySource: { source: string; total: number; statuses: Record<string, number> }[];
    byCampaign: { campaign: string; total: number; statuses: Record<string, number> }[];
  }>({
    queryKey: ["/api/analytics/funnel"],
  });

  const toggleSentiment = useMutation({
    mutationFn: async (enabled: boolean) => {
      await apiRequest("PUT", "/api/settings/sentiment_auto_survey", { value: enabled ? "true" : "false" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings", "sentiment_auto_survey"] });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-[#FF192C] animate-spin" data-testid="loader-dashboard" />
      </div>
    );
  }

  const metrics = [
    { label: "Total Leads", value: stats?.leads?.total ?? 0, icon: Users },
    { label: "Published Posts", value: stats?.posts?.published ?? 0, icon: FileText },
    { label: "Active Subscribers", value: stats?.subscribers?.active ?? 0, icon: Mail },
    { label: "Newsletters Sent", value: stats?.newsletters?.sent ?? 0, icon: Send },
  ];

  const totalClicks = backlinkAnalytics.reduce((sum, a) => sum + a.clicks, 0);
  const totalBacklinks = backlinkAnalytics.reduce((sum, a) => sum + a.backlinkCount, 0);

  const autoSurveyEnabled = sentimentSetting?.value === "true";
  const maxDistCount = ratingSummary?.distribution ? Math.max(...ratingSummary.distribution.map(d => d.count), 1) : 1;
  const sortedSources = funnelData?.bySource ? [...funnelData.bySource].sort((a, b) => b.total - a.total) : [];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <div
            key={i}
            className="p-6 rounded-md bg-[#141416] border border-white/5"
            data-testid={`stat-${m.label.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <m.icon className="w-5 h-5 text-[#B3B3B8]/50 mb-3" />
            <div className="text-3xl font-bold text-[#F5F5F7]" data-testid={`value-${m.label.toLowerCase().replace(/\s+/g, "-")}`}>
              {m.value}
            </div>
            <div className="text-xs text-[#B3B3B8]/50 uppercase tracking-wider mt-1">
              {m.label}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-6 rounded-md bg-[#141416] border border-white/5" data-testid="card-sentiment">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-[#B3B3B8]/50" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#B3B3B8]/50 font-medium">Customer Sentiment</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#B3B3B8]/50 uppercase tracking-wider">Auto-survey</span>
              <Switch
                checked={autoSurveyEnabled}
                onCheckedChange={(checked) => toggleSentiment.mutate(checked)}
                data-testid="switch-auto-survey"
              />
            </div>
          </div>

          <div className="flex items-baseline gap-3 mb-5">
            <span className="text-3xl font-bold text-[#F5F5F7]" data-testid="value-average-rating">
              {ratingSummary?.average ?? "—"}
            </span>
            <span className="text-xs text-[#B3B3B8]/50">avg rating</span>
            <span className="text-sm text-[#B3B3B8] ml-auto" data-testid="value-total-responses">
              {ratingSummary?.total ?? 0} responses
            </span>
          </div>

          <div className="space-y-2">
            {(ratingSummary?.distribution ?? []).slice().reverse().map((d) => (
              <div key={d.score} className="flex items-center gap-2" data-testid={`rating-bar-${d.score}`}>
                <span className="text-xs text-[#B3B3B8] w-8 text-right">{d.score} star</span>
                <div className="flex-1 h-2 bg-[#0B0B0D] rounded-sm overflow-hidden">
                  <div
                    className="h-full bg-[#FF192C] rounded-sm transition-all"
                    style={{ width: `${(d.count / maxDistCount) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-[#B3B3B8]/50 w-6 text-right">{d.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-md bg-[#141416] border border-white/5" data-testid="card-utm-funnel">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-5 h-5 text-[#B3B3B8]/50" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#B3B3B8]/50 font-medium">Lead Attribution</span>
          </div>

          {sortedSources.length > 0 ? (
            <div className="space-y-2">
              {sortedSources.slice(0, 8).map((s) => (
                <div
                  key={s.source}
                  className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-md bg-[#0B0B0D] border border-white/5"
                  data-testid={`funnel-source-${s.source}`}
                >
                  <span className="text-sm text-[#F5F5F7] font-medium">{s.source}</span>
                  <span className="text-sm font-bold text-[#F5F5F7]">{s.total}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#B3B3B8]/50" data-testid="text-no-funnel-data">No attribution data yet.</p>
          )}
        </div>
      </div>

      {(totalBacklinks > 0 || backlinkAnalytics.length > 0) && (
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#B3B3B8]/50 mb-4">Backlink Performance</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-6 rounded-md bg-[#141416] border border-white/5" data-testid="stat-total-backlinks">
              <Globe className="w-5 h-5 text-[#B3B3B8]/50 mb-3" />
              <div className="text-3xl font-bold text-[#F5F5F7]">{totalBacklinks}</div>
              <div className="text-xs text-[#B3B3B8]/50 uppercase tracking-wider mt-1">Total Backlinks</div>
            </div>
            <div className="p-6 rounded-md bg-[#141416] border border-white/5" data-testid="stat-total-clicks">
              <ExternalLink className="w-5 h-5 text-[#B3B3B8]/50 mb-3" />
              <div className="text-3xl font-bold text-[#F5F5F7]">{totalClicks}</div>
              <div className="text-xs text-[#B3B3B8]/50 uppercase tracking-wider mt-1">Total Clicks</div>
            </div>
          </div>
          <div className="space-y-2">
            {backlinkAnalytics.map((a) => (
              <div key={a.platform} className="p-4 rounded-md bg-[#141416] border border-white/5 flex flex-wrap items-center justify-between gap-3" data-testid={`analytics-platform-${a.platform}`}>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[#F5F5F7] text-sm font-semibold">{a.platform}</span>
                  <Badge className="bg-[#FF192C]/20 text-[#FF192C] border-0 no-default-hover-elevate no-default-active-elevate text-xs">
                    {a.backlinkCount} {a.backlinkCount === 1 ? "link" : "links"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-[#F5F5F7]">{a.clicks}</span>
                  <span className="text-xs text-[#B3B3B8]/50">clicks</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LeadsTab({ toast }: { toast: any }) {
  const { data: leads = [], isLoading } = useQuery<Lead[]>({
    queryKey: ["/api/leads"],
  });

  const updateLead = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      await apiRequest("PATCH", `/api/leads/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
      toast({ title: "Lead updated" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-[#FF192C] animate-spin" data-testid="loader-leads" />
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-[#B3B3B8]/50 mb-4" data-testid="text-leads-count">
        {leads.length} leads
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              {["Name", "Email", "Phone", "Vehicle", "Insurance", "Status", "Created"].map((h) => (
                <th key={h} className="text-left text-xs uppercase tracking-wider text-[#B3B3B8]/50 py-3 px-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-white/5" data-testid={`row-lead-${lead.id}`}>
                <td className="py-3 px-3">
                  <div className="text-[#F5F5F7] font-medium">{lead.name}</div>
                  {(lead.utmSource || lead.utmMedium || lead.utmCampaign) && (
                    <div className="flex flex-wrap items-center gap-1 mt-1" data-testid={`utm-badges-${lead.id}`}>
                      {lead.utmSource && (
                        <span className="text-[10px] bg-white/5 text-[#B3B3B8] px-1.5 py-0.5 rounded-sm" data-testid={`utm-source-${lead.id}`}>
                          Source: {lead.utmSource}
                        </span>
                      )}
                      {lead.utmMedium && (
                        <span className="text-[10px] bg-white/5 text-[#B3B3B8] px-1.5 py-0.5 rounded-sm" data-testid={`utm-medium-${lead.id}`}>
                          Medium: {lead.utmMedium}
                        </span>
                      )}
                      {lead.utmCampaign && (
                        <span className="text-[10px] bg-white/5 text-[#B3B3B8] px-1.5 py-0.5 rounded-sm" data-testid={`utm-campaign-${lead.id}`}>
                          Campaign: {lead.utmCampaign}
                        </span>
                      )}
                    </div>
                  )}
                </td>
                <td className="py-3 px-3 text-[#B3B3B8]">{lead.email}</td>
                <td className="py-3 px-3 text-[#B3B3B8]">{lead.phone}</td>
                <td className="py-3 px-3 text-[#B3B3B8]">{lead.vehicle}</td>
                <td className="py-3 px-3 text-[#B3B3B8]">{lead.insurance || "—"}</td>
                <td className="py-3 px-3">
                  <Select
                    value={lead.status}
                    onValueChange={(status) => updateLead.mutate({ id: lead.id, status })}
                  >
                    <SelectTrigger
                      className="w-[180px] bg-[#0B0B0D] border-white/10 text-[#F5F5F7] text-xs"
                      data-testid={`select-status-${lead.id}`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#141416] border-white/10 max-h-[300px]">
                      {leadStatuses.map((status) => (
                        <SelectItem key={status} value={status} className="text-[#F5F5F7] text-xs">
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="py-3 px-3 text-[#B3B3B8] text-xs">
                  {new Date(lead.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {leads.length === 0 && (
        <p className="text-center py-12 text-[#B3B3B8]/50 text-sm" data-testid="text-no-leads">No leads found.</p>
      )}
    </div>
  );
}

function escapeHtml(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function renderMarkdown(md: string) {
  let html = escapeHtml(md);
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold text-[#F5F5F7] mt-6 mb-2">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-[#F5F5F7] mt-8 mb-3">$1</h2>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#F5F5F7]">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/\n\n/g, '</p><p class="text-[#B3B3B8] leading-relaxed mb-4">');
  html = '<p class="text-[#B3B3B8] leading-relaxed mb-4">' + html + '</p>';
  return html;
}

function ArticlePreviewModal({ post, onClose }: { post: Post; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-start justify-center overflow-y-auto py-10"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      data-testid="modal-preview-overlay"
    >
      <div className="w-full max-w-3xl mx-4 bg-[#141416] border border-white/5 rounded-md p-8 relative" data-testid="modal-preview-content">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={onClose}
          data-testid="button-close-preview"
        >
          <X className="w-5 h-5 text-[#B3B3B8]" />
        </Button>

        <h1 className="text-2xl font-bold text-[#F5F5F7] mb-4 pr-10" data-testid="text-preview-title">{post.title}</h1>

        {post.excerpt && (
          <p className="text-[#B3B3B8] italic mb-6 border-l-2 border-[#FF192C] pl-4" data-testid="text-preview-excerpt">{post.excerpt}</p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6" data-testid="tags-preview">
            {post.tags.map((tag, i) => (
              <Badge key={i} className="text-xs bg-white/5 text-[#B3B3B8] border-0 no-default-hover-elevate no-default-active-elevate">{tag}</Badge>
            ))}
          </div>
        )}

        <div
          className="mb-8"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content || "") }}
          data-testid="content-preview"
        />

        <div className="border-t border-white/5 pt-6 space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-[#B3B3B8]/50 mb-3">SEO Metadata</p>
          {post.seoTitle && (
            <div>
              <span className="text-xs text-[#B3B3B8]/50">SEO Title:</span>
              <p className="text-sm text-[#F5F5F7]" data-testid="text-preview-seo-title">{post.seoTitle}</p>
            </div>
          )}
          {post.seoDescription && (
            <div>
              <span className="text-xs text-[#B3B3B8]/50">SEO Description:</span>
              <p className="text-sm text-[#F5F5F7]" data-testid="text-preview-seo-description">{post.seoDescription}</p>
            </div>
          )}
          {post.seoKeywords && post.seoKeywords.length > 0 && (
            <div>
              <span className="text-xs text-[#B3B3B8]/50">SEO Keywords:</span>
              <div className="flex flex-wrap gap-2 mt-1" data-testid="tags-preview-seo-keywords">
                {post.seoKeywords.map((kw, i) => (
                  <Badge key={i} className="text-xs bg-blue-500/10 text-blue-400 border-0 no-default-hover-elevate no-default-active-elevate">{kw}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TopicPreviewModal({ topic, onClose }: { topic: Topic; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-start justify-center overflow-y-auto py-10"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      data-testid="modal-topic-preview-overlay"
    >
      <div className="w-full max-w-3xl mx-4 bg-[#141416] border border-white/5 rounded-md p-8 relative" data-testid="modal-topic-preview-content">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={onClose}
          data-testid="button-close-topic-preview"
        >
          <X className="w-5 h-5 text-[#B3B3B8]" />
        </Button>

        <h1 className="text-2xl font-bold text-[#F5F5F7] mb-4 pr-10" data-testid="text-topic-preview-title">{topic.title}</h1>

        {topic.overview && (
          <p className="text-[#B3B3B8] leading-relaxed mb-6 border-l-2 border-[#FF192C] pl-4" data-testid="text-topic-preview-overview">{topic.overview}</p>
        )}

        {topic.reasoning && (
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.3em] text-[#B3B3B8]/50 mb-2">Reasoning</p>
            <p className="text-sm text-[#B3B3B8] leading-relaxed" data-testid="text-topic-preview-reasoning">{topic.reasoning}</p>
          </div>
        )}

        {topic.targetKeywords && topic.targetKeywords.length > 0 && (
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.3em] text-[#B3B3B8]/50 mb-2">Target Keywords</p>
            <div className="flex flex-wrap gap-2" data-testid="tags-topic-preview-keywords">
              {topic.targetKeywords.map((kw, i) => (
                <Badge key={i} className="text-xs bg-blue-500/10 text-blue-400 border-0 no-default-hover-elevate no-default-active-elevate">{kw}</Badge>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-6">
          {topic.searchIntent && (
            <div className="p-4 rounded-md bg-[#0B0B0D] border border-white/5">
              <p className="text-xs uppercase tracking-[0.3em] text-[#B3B3B8]/50 mb-1">Search Intent</p>
              <p className="text-sm text-[#F5F5F7] font-semibold" data-testid="text-topic-preview-intent">{topic.searchIntent}</p>
            </div>
          )}
          {topic.estimatedSearchVolume && (
            <div className="p-4 rounded-md bg-[#0B0B0D] border border-white/5">
              <p className="text-xs uppercase tracking-[0.3em] text-[#B3B3B8]/50 mb-1">Search Volume</p>
              <p className="text-sm text-[#F5F5F7] font-semibold" data-testid="text-topic-preview-volume">{topic.estimatedSearchVolume}</p>
            </div>
          )}
          {topic.competitionLevel && (
            <div className="p-4 rounded-md bg-[#0B0B0D] border border-white/5">
              <p className="text-xs uppercase tracking-[0.3em] text-[#B3B3B8]/50 mb-1">Competition</p>
              <p className="text-sm text-[#F5F5F7] font-semibold" data-testid="text-topic-preview-competition">{topic.competitionLevel}</p>
            </div>
          )}
        </div>

        {topic.leadPotential && (
          <div className="border-t border-white/5 pt-6">
            <p className="text-xs uppercase tracking-[0.3em] text-[#B3B3B8]/50 mb-2">Lead Potential</p>
            <p className="text-sm text-[#B3B3B8] leading-relaxed" data-testid="text-topic-preview-lead-potential">{topic.leadPotential}</p>
          </div>
        )}
      </div>
    </div>
  );
}

type BlogSubTab = "topics" | "queue" | "archive" | "published" | "backlinks";

function BlogTab({
  toast,
  aiTopic,
  setAiTopic,
  showAiForm,
  setShowAiForm,
  user,
}: {
  toast: any;
  aiTopic: string;
  setAiTopic: (v: string) => void;
  showAiForm: boolean;
  setShowAiForm: (v: boolean) => void;
  user: { id: number; name: string; email: string; role: string };
}) {
  const [blogSubTab, setBlogSubTab] = useState<BlogSubTab>("topics");
  const [previewPost, setPreviewPost] = useState<Post | null>(null);
  const [previewTopic, setPreviewTopic] = useState<Topic | null>(null);

  const subTabs: { key: BlogSubTab; label: string; icon: typeof BookOpen; adminOnly?: boolean }[] = [
    { key: "topics", label: "Topics", icon: Zap },
    { key: "queue", label: "Queue", icon: FileText },
    { key: "archive", label: "Archive", icon: Archive },
    { key: "published", label: "Published", icon: Globe },
    { key: "backlinks", label: "Backlinks", icon: Link2, adminOnly: true },
  ];

  const visibleSubTabs = subTabs.filter(t => !t.adminOnly || user.role === "root" || user.role === "admin");

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-white/5 pb-4">
        {visibleSubTabs.map((tab) => (
          <Button
            key={tab.key}
            variant={blogSubTab === tab.key ? "default" : "ghost"}
            className={blogSubTab === tab.key ? "bg-[#FF192C] text-white" : "text-[#B3B3B8]"}
            onClick={() => setBlogSubTab(tab.key)}
            data-testid={`subtab-${tab.key}`}
          >
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.label}
          </Button>
        ))}
      </div>

      {blogSubTab === "topics" && (
        <TopicsSubTab
          toast={toast}
          onPreviewTopic={setPreviewTopic}
          aiTopic={aiTopic}
          setAiTopic={setAiTopic}
          showAiForm={showAiForm}
          setShowAiForm={setShowAiForm}
        />
      )}
      {blogSubTab === "queue" && <PublisherQueueSubTab toast={toast} onPreview={setPreviewPost} />}
      {blogSubTab === "archive" && <ArchiveSubTab />}
      {blogSubTab === "published" && <PublishedSubTab onPreview={setPreviewPost} />}
      {blogSubTab === "backlinks" && <BacklinksSubTab toast={toast} />}

      {previewPost && <ArticlePreviewModal post={previewPost} onClose={() => setPreviewPost(null)} />}
      {previewTopic && <TopicPreviewModal topic={previewTopic} onClose={() => setPreviewTopic(null)} />}
    </div>
  );
}

function TopicsSubTab({
  toast,
  onPreviewTopic,
  aiTopic,
  setAiTopic,
  showAiForm,
  setShowAiForm,
}: {
  toast: any;
  onPreviewTopic: (topic: Topic) => void;
  aiTopic: string;
  setAiTopic: (v: string) => void;
  showAiForm: boolean;
  setShowAiForm: (v: boolean) => void;
}) {
  const { data: topics = [], isLoading } = useQuery<Topic[]>({
    queryKey: ["/api/topics", "suggested"],
    queryFn: async () => {
      const res = await fetch("/api/topics?status=suggested", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch topics");
      return res.json();
    },
    refetchInterval: (query) => {
      const data = query.state.data as Topic[] | undefined;
      if (data && data.some(t => t.status === "generating")) return 5000;
      return false;
    },
  });

  const { data: generatingTopics = [] } = useQuery<Topic[]>({
    queryKey: ["/api/topics", "generating"],
    queryFn: async () => {
      const res = await fetch("/api/topics?status=generating", { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
    refetchInterval: (query) => {
      const data = query.state.data as Topic[] | undefined;
      if (data && data.length > 0) return 5000;
      return false;
    },
  });

  const allTopics = [...topics, ...generatingTopics.filter(gt => !topics.some(t => t.id === gt.id))];

  const getTopics = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/ai/research");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/topics"] });
      toast({ title: "Research agent launched, topics incoming" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const generateArticle = useMutation({
    mutationFn: async (topicId: number) => {
      const res = await apiRequest("POST", `/api/topics/${topicId}/generate`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/topics"] });
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({ title: "Article generation started" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const archiveTopic = useMutation({
    mutationFn: async (topicId: number) => {
      await apiRequest("PATCH", `/api/topics/${topicId}/archive`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/topics"] });
      toast({ title: "Topic archived" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const generateSingleArticle = useMutation({
    mutationFn: async (topic: string) => {
      const res = await apiRequest("POST", "/api/ai/generate-article", { topic });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({ title: "Article generated" });
      setAiTopic("");
      setShowAiForm(false);
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const intentBadge = (intent: string | null) => {
    if (intent === "transactional") return "bg-green-500/20 text-green-400";
    if (intent === "commercial") return "bg-blue-500/20 text-blue-400";
    return "bg-purple-500/20 text-purple-400";
  };

  const volumeBadge = (vol: string | null) => {
    if (vol === "high") return "bg-green-500/20 text-green-400";
    if (vol === "medium") return "bg-yellow-500/20 text-yellow-400";
    return "bg-red-500/20 text-red-400";
  };

  const competitionBadge = (comp: string | null) => {
    if (comp === "low") return "bg-green-500/20 text-green-400";
    if (comp === "medium") return "bg-yellow-500/20 text-yellow-400";
    return "bg-red-500/20 text-red-400";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-[#FF192C] animate-spin" data-testid="loader-topics" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Button
          onClick={() => getTopics.mutate()}
          disabled={getTopics.isPending}
          className="bg-[#FF192C] text-white"
          data-testid="button-get-topics"
        >
          {getTopics.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Zap className="w-4 h-4 mr-2" />}
          Get Topics
        </Button>
        <Button
          variant="ghost"
          className="text-[#B3B3B8]"
          onClick={() => setShowAiForm(!showAiForm)}
          data-testid="button-ai-generate"
        >
          <Sparkles className="w-4 h-4 mr-2" /> AI Generate
        </Button>
      </div>

      {showAiForm && (
        <div className="p-6 rounded-md bg-[#141416] border border-white/5 mb-6" data-testid="form-ai-generate">
          <p className="text-xs uppercase tracking-[0.3em] text-[#B3B3B8]/50 mb-4">Generate Single Article with AI</p>
          <div className="flex flex-wrap gap-3">
            <Input
              placeholder="Enter topic..."
              value={aiTopic}
              onChange={(e) => setAiTopic(e.target.value)}
              className="flex-1 min-w-[200px] bg-[#0B0B0D] border-white/10 text-[#F5F5F7]"
              data-testid="input-ai-topic"
            />
            <Button
              onClick={() => aiTopic.trim() && generateSingleArticle.mutate(aiTopic.trim())}
              disabled={generateSingleArticle.isPending || !aiTopic.trim()}
              className="bg-[#FF192C] text-white"
              data-testid="button-ai-submit"
            >
              {generateSingleArticle.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
              Generate
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {allTopics.map((topic) => (
          <div
            key={topic.id}
            className="p-5 rounded-md bg-[#141416] border border-white/5"
            data-testid={`card-topic-${topic.id}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-[#F5F5F7] font-semibold text-sm mb-2" data-testid={`text-topic-title-${topic.id}`}>{topic.title}</h3>
                {topic.overview && (
                  <p className="text-xs text-[#B3B3B8] mb-3 line-clamp-2" data-testid={`text-topic-overview-${topic.id}`}>
                    {topic.overview.length > 150 ? topic.overview.slice(0, 150) + "..." : topic.overview}
                  </p>
                )}
                {topic.targetKeywords && topic.targetKeywords.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {topic.targetKeywords.slice(0, 5).map((kw, i) => (
                      <Badge key={i} className="text-xs bg-blue-500/10 text-blue-400 border-0 no-default-hover-elevate no-default-active-elevate">{kw}</Badge>
                    ))}
                    {topic.targetKeywords.length > 5 && (
                      <Badge className="text-xs bg-white/5 text-[#B3B3B8] border-0 no-default-hover-elevate no-default-active-elevate">+{topic.targetKeywords.length - 5}</Badge>
                    )}
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {topic.searchIntent && (
                    <Badge className={`text-xs border-0 no-default-hover-elevate no-default-active-elevate ${intentBadge(topic.searchIntent)}`} data-testid={`badge-intent-${topic.id}`}>
                      {topic.searchIntent}
                    </Badge>
                  )}
                  {topic.estimatedSearchVolume && (
                    <Badge className={`text-xs border-0 no-default-hover-elevate no-default-active-elevate ${volumeBadge(topic.estimatedSearchVolume)}`} data-testid={`badge-volume-${topic.id}`}>
                      vol: {topic.estimatedSearchVolume}
                    </Badge>
                  )}
                  {topic.competitionLevel && (
                    <Badge className={`text-xs border-0 no-default-hover-elevate no-default-active-elevate ${competitionBadge(topic.competitionLevel)}`} data-testid={`badge-competition-${topic.id}`}>
                      comp: {topic.competitionLevel}
                    </Badge>
                  )}
                  {topic.status === "generating" && (
                    <Badge className="text-xs bg-yellow-500/20 text-yellow-400 border-0 no-default-hover-elevate no-default-active-elevate" data-testid={`badge-generating-${topic.id}`}>
                      <Loader2 className="w-3 h-3 animate-spin mr-1" /> generating
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onPreviewTopic(topic)}
                  data-testid={`button-preview-topic-${topic.id}`}
                >
                  <Eye className="w-4 h-4 text-[#B3B3B8]" />
                </Button>
                <Button
                  onClick={() => generateArticle.mutate(topic.id)}
                  disabled={generateArticle.isPending || topic.status === "generating" || topic.status === "generated"}
                  className="bg-[#FF192C] text-white"
                  data-testid={`button-generate-article-${topic.id}`}
                >
                  {(generateArticle.isPending || topic.status === "generating") ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Sparkles className="w-4 h-4 mr-2" />
                  )}
                  Generate Article
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => archiveTopic.mutate(topic.id)}
                  disabled={archiveTopic.isPending}
                  data-testid={`button-archive-topic-${topic.id}`}
                >
                  <Archive className="w-4 h-4 text-[#B3B3B8]" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        {allTopics.length === 0 && (
          <p className="text-center py-12 text-[#B3B3B8]/50 text-sm" data-testid="text-no-topics">No suggested topics. Click "Get Topics" to generate research-backed suggestions.</p>
        )}
      </div>
    </div>
  );
}

function PublisherQueueSubTab({ toast, onPreview }: { toast: any; onPreview: (post: Post) => void }) {
  const { data: queuedPosts = [], isLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts", "queue"],
    queryFn: async () => {
      const res = await fetch("/api/posts/queue", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch queue");
      return res.json();
    },
  });

  const publishPost = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("POST", `/api/posts/${id}/publish`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({ title: "Post published" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const discardPost = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({ title: "Post discarded" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-[#FF192C] animate-spin" data-testid="loader-queue" />
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-[#B3B3B8]/50 mb-4" data-testid="text-queue-count">
        {queuedPosts.length} queued articles
      </p>
      <div className="space-y-3">
        {queuedPosts.map((post) => (
          <div
            key={post.id}
            className="p-5 rounded-md bg-[#141416] border border-white/5"
            data-testid={`card-queue-post-${post.id}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-[#F5F5F7] font-semibold text-sm mb-1" data-testid={`text-queue-title-${post.id}`}>{post.title}</h3>
                {post.excerpt && <p className="text-xs text-[#B3B3B8] mb-2" data-testid={`text-queue-excerpt-${post.id}`}>{post.excerpt}</p>}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {post.tags.map((tag, i) => (
                      <Badge key={i} className="text-xs bg-white/5 text-[#B3B3B8] border-0 no-default-hover-elevate no-default-active-elevate">{tag}</Badge>
                    ))}
                  </div>
                )}
                {(post.seoTitle || post.seoDescription) && (
                  <div className="text-xs text-[#B3B3B8]/40 space-y-1">
                    {post.seoTitle && <p>SEO: {post.seoTitle}</p>}
                    {post.seoDescription && <p>{post.seoDescription}</p>}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onPreview(post)}
                  data-testid={`button-preview-queue-${post.id}`}
                >
                  <Eye className="w-4 h-4 text-[#B3B3B8]" />
                </Button>
                <Button
                  onClick={() => publishPost.mutate(post.id)}
                  disabled={publishPost.isPending}
                  className="bg-[#FF192C] text-white"
                  data-testid={`button-publish-${post.id}`}
                >
                  {publishPost.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Globe className="w-4 h-4 mr-2" />}
                  Publish
                </Button>
                <Button
                  variant="ghost"
                  className="text-red-400"
                  onClick={() => discardPost.mutate(post.id)}
                  disabled={discardPost.isPending}
                  data-testid={`button-discard-${post.id}`}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Discard
                </Button>
              </div>
            </div>
            <p className="text-xs text-[#B3B3B8]/30 mt-3 italic" data-testid={`text-publish-note-${post.id}`}>
              Publishing triggers SEO optimization, backlink creation, and newsletter delivery.
            </p>
          </div>
        ))}
        {queuedPosts.length === 0 && (
          <p className="text-center py-12 text-[#B3B3B8]/50 text-sm" data-testid="text-no-queued">No queued articles.</p>
        )}
      </div>
    </div>
  );
}

function ArchiveSubTab() {
  const { data: archivedTopics = [], isLoading } = useQuery<Topic[]>({
    queryKey: ["/api/topics", "archived"],
    queryFn: async () => {
      const res = await fetch("/api/topics?status=archived", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch archived topics");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-[#FF192C] animate-spin" data-testid="loader-archive" />
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-[#B3B3B8]/50 mb-4" data-testid="text-archive-count">
        {archivedTopics.length} archived topics
      </p>
      <div className="space-y-3">
        {archivedTopics.map((topic) => (
          <div
            key={topic.id}
            className="p-5 rounded-md bg-[#141416] border border-white/5"
            data-testid={`card-archived-topic-${topic.id}`}
          >
            <h3 className="text-[#F5F5F7] font-semibold text-sm mb-1" data-testid={`text-archived-title-${topic.id}`}>{topic.title}</h3>
            {topic.overview && (
              <p className="text-xs text-[#B3B3B8] mb-2" data-testid={`text-archived-overview-${topic.id}`}>
                {topic.overview.length > 200 ? topic.overview.slice(0, 200) + "..." : topic.overview}
              </p>
            )}
            <p className="text-xs text-[#B3B3B8]/40">
              {new Date(topic.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </p>
          </div>
        ))}
        {archivedTopics.length === 0 && (
          <p className="text-center py-12 text-[#B3B3B8]/50 text-sm" data-testid="text-no-archived">No archived topics.</p>
        )}
      </div>
    </div>
  );
}

function PublishedSubTab({ onPreview }: { onPreview: (post: Post) => void }) {
  const { data: publishedPosts = [], isLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts", "published"],
    queryFn: async () => {
      const res = await fetch("/api/posts?status=published", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch published posts");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-[#FF192C] animate-spin" data-testid="loader-published" />
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-[#B3B3B8]/50 mb-4" data-testid="text-published-count">
        {publishedPosts.length} published articles
      </p>
      <div className="space-y-3">
        {publishedPosts.map((post) => (
          <div
            key={post.id}
            className="p-5 rounded-md bg-[#141416] border border-white/5 flex flex-wrap items-center justify-between gap-4"
            data-testid={`card-published-post-${post.id}`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <span className="text-[#F5F5F7] font-semibold text-sm" data-testid={`text-published-title-${post.id}`}>{post.title}</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-1">
                <span className="text-xs text-[#B3B3B8]/40" data-testid={`text-published-slug-${post.id}`}>/{post.slug}</span>
                {post.publishedAt && (
                  <span className="text-xs text-[#B3B3B8]/40">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="text-xs bg-white/5 text-[#B3B3B8] border-0 no-default-hover-elevate no-default-active-elevate" data-testid={`badge-reads-${post.id}`}>
                <Eye className="w-3 h-3 mr-1" />
                {post.readCount ?? 0}
              </Badge>
              <Badge className="text-xs bg-white/5 text-[#B3B3B8] border-0 no-default-hover-elevate no-default-active-elevate" data-testid={`badge-shares-${post.id}`}>
                <Share2 className="w-3 h-3 mr-1" />
                {post.shareCount ?? 0}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onPreview(post)}
                data-testid={`button-preview-published-${post.id}`}
              >
                <Eye className="w-4 h-4 text-[#B3B3B8]" />
              </Button>
            </div>
          </div>
        ))}
        {publishedPosts.length === 0 && (
          <p className="text-center py-12 text-[#B3B3B8]/50 text-sm" data-testid="text-no-published">No published articles yet.</p>
        )}
      </div>
    </div>
  );
}

function BacklinksSubTab({ toast }: { toast: any }) {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [platformInput, setPlatformInput] = useState("");
  const [platforms, setPlatforms] = useState<any[]>([]);

  const { data: publishedPosts = [] } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  const filteredPosts = publishedPosts.filter((p) => p.status === "published");

  const { data: backlinks = [], isLoading: backlinksLoading } = useQuery<any[]>({
    queryKey: ["/api/backlinks", selectedPostId],
    queryFn: async () => {
      if (!selectedPostId) return [];
      const res = await fetch(`/api/backlinks?postId=${selectedPostId}`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch backlinks");
      return res.json();
    },
    enabled: !!selectedPostId,
  });

  const researchPlatforms = useMutation({
    mutationFn: async (postId: number) => {
      const res = await apiRequest("POST", "/api/ai/backlink-research", { postId });
      return res.json();
    },
    onSuccess: (data: any) => {
      setPlatforms(data.platforms || []);
      toast({ title: "Platform research complete" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const generateBacklink = useMutation({
    mutationFn: async ({ postId, platform }: { postId: number; platform: string }) => {
      const res = await apiRequest("POST", "/api/backlinks/generate", { postId, platform });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/backlinks", selectedPostId] });
      toast({ title: "Backlink generated" });
      setPlatformInput("");
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard" });
  };

  const authorityBadge = (authority: string) => {
    if (authority === "high") return "bg-green-500/20 text-green-400";
    if (authority === "medium") return "bg-yellow-500/20 text-yellow-400";
    return "bg-red-500/20 text-red-400";
  };

  return (
    <div>
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[#B3B3B8]/50 mb-3">Select Published Post</p>
        <Select
          value={selectedPostId?.toString() || ""}
          onValueChange={(val) => { setSelectedPostId(parseInt(val)); setPlatforms([]); }}
        >
          <SelectTrigger className="w-full max-w-md bg-[#0B0B0D] border-white/10 text-[#F5F5F7]" data-testid="select-backlink-post">
            <SelectValue placeholder="Choose a published post..." />
          </SelectTrigger>
          <SelectContent className="bg-[#141416] border-white/10 max-h-[300px]">
            {filteredPosts.map((post) => (
              <SelectItem key={post.id} value={post.id.toString()} className="text-[#F5F5F7] text-xs">
                {post.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedPostId && (
        <>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Button
              onClick={() => researchPlatforms.mutate(selectedPostId)}
              disabled={researchPlatforms.isPending}
              className="bg-[#FF192C] text-white"
              data-testid="button-research-platforms"
            >
              {researchPlatforms.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Search className="w-4 h-4 mr-2" />}
              Research Platforms
            </Button>
          </div>

          {platforms.length > 0 && (
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#B3B3B8]/50 mb-3">Recommended Platforms</p>
              <div className="space-y-2">
                {platforms.map((p: any, i: number) => (
                  <div key={i} className="p-4 rounded-md bg-[#141416] border border-white/5 flex flex-wrap items-start justify-between gap-3" data-testid={`card-platform-${i}`}>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[#F5F5F7] font-semibold text-sm">{p.platform}</span>
                        <Badge className={`text-xs border-0 no-default-hover-elevate no-default-active-elevate ${authorityBadge(p.authority)}`}>{p.authority}</Badge>
                        <Badge className="text-xs bg-white/5 text-[#B3B3B8] border-0 no-default-hover-elevate no-default-active-elevate">{p.type}</Badge>
                      </div>
                      <p className="text-xs text-[#B3B3B8]">{p.relevance}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.3em] text-[#B3B3B8]/50 mb-3">Generate Backlink</p>
            <div className="flex flex-wrap gap-3">
              <Input
                placeholder="Platform name..."
                value={platformInput}
                onChange={(e) => setPlatformInput(e.target.value)}
                className="flex-1 min-w-[200px] bg-[#0B0B0D] border-white/10 text-[#F5F5F7]"
                data-testid="input-backlink-platform"
              />
              <Button
                onClick={() => platformInput.trim() && generateBacklink.mutate({ postId: selectedPostId, platform: platformInput.trim() })}
                disabled={generateBacklink.isPending || !platformInput.trim()}
                className="bg-[#FF192C] text-white"
                data-testid="button-generate-backlink"
              >
                {generateBacklink.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Link2 className="w-4 h-4 mr-2" />}
                Generate
              </Button>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#B3B3B8]/50 mb-3">Existing Backlinks</p>
            {backlinksLoading ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="w-5 h-5 text-[#FF192C] animate-spin" data-testid="loader-backlinks" />
              </div>
            ) : backlinks.length === 0 ? (
              <p className="text-center py-8 text-[#B3B3B8]/50 text-sm" data-testid="text-no-backlinks">No backlinks yet for this post.</p>
            ) : (
              <div className="space-y-2">
                {backlinks.map((bl: any) => (
                  <div key={bl.id} className="p-4 rounded-md bg-[#141416] border border-white/5 flex flex-wrap items-center justify-between gap-3" data-testid={`card-backlink-${bl.id}`}>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <Globe className="w-4 h-4 text-[#B3B3B8]/50" />
                        <span className="text-[#F5F5F7] font-semibold text-sm" data-testid={`text-backlink-platform-${bl.id}`}>{bl.platform}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs text-[#B3B3B8] truncate max-w-[300px]" data-testid={`text-backlink-url-${bl.id}`}>{bl.url}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(bl.url)}
                          data-testid={`button-copy-backlink-${bl.id}`}
                        >
                          <Copy className="w-3 h-3 text-[#B3B3B8]" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="text-xs bg-white/5 text-[#B3B3B8] border-0 no-default-hover-elevate no-default-active-elevate" data-testid={`badge-clicks-${bl.id}`}>
                        {bl.clicks} clicks
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {filteredPosts.length === 0 && (
        <p className="text-center py-12 text-[#B3B3B8]/50 text-sm" data-testid="text-no-published-posts">No published posts available for backlink research.</p>
      )}
    </div>
  );
}

function NewsletterTab({
  toast,
  nlSubject,
  setNlSubject,
  nlContent,
  setNlContent,
}: {
  toast: any;
  nlSubject: string;
  setNlSubject: (v: string) => void;
  nlContent: string;
  setNlContent: (v: string) => void;
}) {
  const { data: subscribers = [], isLoading: subsLoading } = useQuery<Subscriber[]>({
    queryKey: ["/api/subscribers"],
  });

  const { data: newsletters = [], isLoading: nlLoading } = useQuery<Newsletter[]>({
    queryKey: ["/api/newsletters"],
  });

  const deleteSubscriber = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/subscribers/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/subscribers"] });
      toast({ title: "Subscriber removed" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const createNewsletter = useMutation({
    mutationFn: async (data: { subject: string; htmlContent: string }) => {
      await apiRequest("POST", "/api/newsletters", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/newsletters"] });
      toast({ title: "Newsletter draft saved" });
      setNlSubject("");
      setNlContent("");
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const sendNewsletter = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("POST", `/api/newsletters/${id}/send`);
      return res.json();
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/newsletters"] });
      toast({ title: data.message || "Newsletter sent" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const isLoading = subsLoading || nlLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-[#FF192C] animate-spin" data-testid="loader-newsletter" />
      </div>
    );
  }

  const activeCount = subscribers.filter((s) => s.status === "active").length;

  return (
    <div className="space-y-8">
      <div>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[#B3B3B8]/50">Subscribers</p>
          <Badge className="bg-[#FF192C]/20 text-[#FF192C] border-0 no-default-hover-elevate no-default-active-elevate text-xs" data-testid="badge-subscriber-count">
            {activeCount} active
          </Badge>
        </div>
        <div className="space-y-2">
          {subscribers.map((sub) => (
            <div
              key={sub.id}
              className="p-4 rounded-md bg-[#141416] border border-white/5 flex flex-wrap items-center justify-between gap-3"
              data-testid={`row-subscriber-${sub.id}`}
            >
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-[#F5F5F7] text-sm">{sub.name || "—"}</span>
                <span className="text-[#B3B3B8] text-sm">{sub.email}</span>
                <Badge
                  className={`text-xs border-0 no-default-hover-elevate no-default-active-elevate ${sub.status === "active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}
                >
                  {sub.status}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteSubscriber.mutate(sub.id)}
                data-testid={`button-delete-subscriber-${sub.id}`}
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </Button>
            </div>
          ))}
          {subscribers.length === 0 && (
            <p className="text-center py-8 text-[#B3B3B8]/50 text-sm" data-testid="text-no-subscribers">No subscribers yet.</p>
          )}
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[#B3B3B8]/50 mb-4">Compose Newsletter</p>
        <div className="p-6 rounded-md bg-[#141416] border border-white/5 space-y-4" data-testid="form-newsletter">
          <Input
            placeholder="Subject"
            value={nlSubject}
            onChange={(e) => setNlSubject(e.target.value)}
            className="bg-[#0B0B0D] border-white/10 text-[#F5F5F7]"
            data-testid="input-newsletter-subject"
          />
          <Textarea
            placeholder="HTML Content"
            value={nlContent}
            onChange={(e) => setNlContent(e.target.value)}
            className="bg-[#0B0B0D] border-white/10 text-[#F5F5F7] min-h-[150px]"
            data-testid="input-newsletter-content"
          />
          <Button
            onClick={() => {
              if (!nlSubject.trim() || !nlContent.trim()) return;
              createNewsletter.mutate({ subject: nlSubject, htmlContent: nlContent });
            }}
            disabled={createNewsletter.isPending || !nlSubject.trim() || !nlContent.trim()}
            className="bg-[#FF192C] text-white"
            data-testid="button-newsletter-save"
          >
            {createNewsletter.isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            Save Draft
          </Button>
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[#B3B3B8]/50 mb-4">Newsletters</p>
        <div className="space-y-3">
          {newsletters.map((nl) => (
            <div
              key={nl.id}
              className="p-5 rounded-md bg-[#141416] border border-white/5 flex flex-wrap items-center justify-between gap-4"
              data-testid={`card-newsletter-${nl.id}`}
            >
              <div>
                <span className="text-[#F5F5F7] font-semibold text-sm">{nl.subject}</span>
                <div className="flex flex-wrap items-center gap-3 mt-1">
                  <Badge
                    className={`text-xs border-0 no-default-hover-elevate no-default-active-elevate ${nl.status === "sent" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}
                  >
                    {nl.status}
                  </Badge>
                  {nl.recipientCount !== null && nl.recipientCount > 0 && (
                    <span className="text-xs text-[#B3B3B8]/40">{nl.recipientCount} recipients</span>
                  )}
                </div>
              </div>
              {nl.status !== "sent" && (
                <Button
                  variant="ghost"
                  onClick={() => sendNewsletter.mutate(nl.id)}
                  disabled={sendNewsletter.isPending}
                  className="text-[#FF192C]"
                  data-testid={`button-send-newsletter-${nl.id}`}
                >
                  {sendNewsletter.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                  Send
                </Button>
              )}
            </div>
          ))}
          {newsletters.length === 0 && (
            <p className="text-center py-8 text-[#B3B3B8]/50 text-sm" data-testid="text-no-newsletters">No newsletters yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function UsersTab({
  toast,
  showAddUser,
  setShowAddUser,
  userForm,
  setUserForm,
  currentUserId,
  currentUserRole,
}: {
  toast: any;
  showAddUser: boolean;
  setShowAddUser: (v: boolean) => void;
  userForm: { name: string; email: string; password: string; role: string };
  setUserForm: (v: any) => void;
  currentUserId: number;
  currentUserRole: string;
}) {
  const isRoot = currentUserRole === "root";
  const { data: users = [], isLoading } = useQuery<{ id: number; name: string; email: string; role: string; createdAt: string }[]>({
    queryKey: ["/api/users"],
  });

  const createUser = useMutation({
    mutationFn: async (data: { name: string; email: string; password: string; role: string }) => {
      await apiRequest("POST", "/api/users", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      toast({ title: "User created" });
      setShowAddUser(false);
      setUserForm({ name: "", email: "", password: "", role: "editor" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const deleteUser = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      toast({ title: "User deleted" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-[#FF192C] animate-spin" data-testid="loader-users" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Button
          onClick={() => setShowAddUser(!showAddUser)}
          className="bg-[#FF192C] text-white"
          data-testid="button-add-user"
        >
          <Plus className="w-4 h-4 mr-2" /> Add User
        </Button>
      </div>

      {showAddUser && (
        <div className="p-6 rounded-md bg-[#141416] border border-white/5 mb-6 space-y-4" data-testid="form-add-user">
          <p className="text-xs uppercase tracking-[0.3em] text-[#B3B3B8]/50 mb-2">New User</p>
          <Input
            placeholder="Name"
            value={userForm.name}
            onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
            className="bg-[#0B0B0D] border-white/10 text-[#F5F5F7]"
            data-testid="input-user-name"
          />
          <Input
            placeholder="Email"
            type="email"
            value={userForm.email}
            onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
            className="bg-[#0B0B0D] border-white/10 text-[#F5F5F7]"
            data-testid="input-user-email"
          />
          <Input
            placeholder="Password"
            type="password"
            value={userForm.password}
            onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
            className="bg-[#0B0B0D] border-white/10 text-[#F5F5F7]"
            data-testid="input-user-password"
          />
          <Select value={userForm.role} onValueChange={(role) => setUserForm({ ...userForm, role })}>
            <SelectTrigger className="bg-[#0B0B0D] border-white/10 text-[#F5F5F7]" data-testid="select-user-role">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#141416] border-white/10">
              {isRoot && <SelectItem value="root" className="text-[#F5F5F7]">Root</SelectItem>}
              <SelectItem value="admin" className="text-[#F5F5F7]">Admin</SelectItem>
              <SelectItem value="editor" className="text-[#F5F5F7]">Editor</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => {
                if (!userForm.name.trim() || !userForm.email.trim() || !userForm.password.trim()) return;
                createUser.mutate(userForm);
              }}
              disabled={createUser.isPending || !userForm.name.trim() || !userForm.email.trim() || !userForm.password.trim()}
              className="bg-[#FF192C] text-white"
              data-testid="button-user-submit"
            >
              {createUser.isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              Create User
            </Button>
            <Button variant="ghost" className="text-[#B3B3B8]" onClick={() => setShowAddUser(false)} data-testid="button-user-cancel">
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {users.map((u) => (
          <div
            key={u.id}
            className="p-5 rounded-md bg-[#141416] border border-white/5 flex flex-wrap items-center justify-between gap-4"
            data-testid={`card-user-${u.id}`}
          >
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-[#F5F5F7] font-semibold text-sm">{u.name}</span>
              <span className="text-[#B3B3B8] text-sm">{u.email}</span>
              <Badge className="bg-[#FF192C]/20 text-[#FF192C] border-0 no-default-hover-elevate no-default-active-elevate text-xs">
                {u.role}
              </Badge>
            </div>
            {u.id !== currentUserId && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteUser.mutate(u.id)}
                data-testid={`button-delete-user-${u.id}`}
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </Button>
            )}
          </div>
        ))}
        {users.length === 0 && (
          <p className="text-center py-8 text-[#B3B3B8]/50 text-sm" data-testid="text-no-users">No users found.</p>
        )}
      </div>
    </div>
  );
}

function IntegrationsTab({ toast }: { toast: any }) {
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", url: "", events: [] as string[], active: true });
  const [viewLogs, setViewLogs] = useState<number | null>(null);
  const [showSecret, setShowSecret] = useState<number | null>(null);

  const { data: webhooksData = [], isLoading } = useQuery<Webhook[]>({ queryKey: ["/api/webhooks"] });
  const { data: logsData = [] } = useQuery<WebhookLog[]>({
    queryKey: ["/api/webhooks/logs", viewLogs],
    queryFn: async () => {
      const url = viewLogs ? `/api/webhooks/logs?webhookId=${viewLogs}` : "/api/webhooks/logs";
      const res = await fetch(url, { credentials: "include" });
      return res.json();
    },
    enabled: viewLogs !== null,
  });

  const createWebhook = useMutation({
    mutationFn: async (data: typeof form) => {
      const res = await apiRequest("POST", "/api/webhooks", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/webhooks"] });
      toast({ title: "Webhook created" });
      setShowAdd(false);
      setForm({ name: "", url: "", events: [], active: true });
    },
    onError: () => toast({ title: "Failed to create webhook", variant: "destructive" }),
  });

  const updateWebhook = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Webhook> }) => {
      const res = await apiRequest("PATCH", `/api/webhooks/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/webhooks"] });
      toast({ title: "Webhook updated" });
      setEditingId(null);
      setForm({ name: "", url: "", events: [], active: true });
    },
    onError: () => toast({ title: "Failed to update webhook", variant: "destructive" }),
  });

  const deleteWebhook = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/webhooks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/webhooks"] });
      toast({ title: "Webhook deleted" });
    },
    onError: () => toast({ title: "Failed to delete webhook", variant: "destructive" }),
  });

  const testWebhook = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("POST", `/api/webhooks/${id}/test`);
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/webhooks/logs"] });
      if (data.success) {
        toast({ title: "Test delivered", description: `Status ${data.statusCode} in ${data.duration}ms` });
      } else {
        toast({ title: "Test failed", description: data.error || `Status ${data.statusCode}`, variant: "destructive" });
      }
    },
    onError: () => toast({ title: "Test failed", variant: "destructive" }),
  });

  const toggleEvent = (event: string) => {
    setForm(f => ({
      ...f,
      events: f.events.includes(event) ? f.events.filter(e => e !== event) : [...f.events, event],
    }));
  };

  const startEdit = (hook: Webhook) => {
    setEditingId(hook.id);
    setForm({ name: hook.name, url: hook.url, events: hook.events || [], active: hook.active });
    setShowAdd(true);
  };

  const handleSubmit = () => {
    if (!form.name || !form.url || form.events.length === 0) {
      toast({ title: "Name, URL, and at least one event required", variant: "destructive" });
      return;
    }
    if (editingId) {
      updateWebhook.mutate({ id: editingId, data: form });
    } else {
      createWebhook.mutate(form);
    }
  };

  const cancelForm = () => {
    setShowAdd(false);
    setEditingId(null);
    setForm({ name: "", url: "", events: [], active: true });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-5 h-5 text-[#FF192C] animate-spin" data-testid="loader-webhooks" />
      </div>
    );
  }

  if (viewLogs !== null) {
    const hookName = webhooksData.find(w => w.id === viewLogs)?.name || "Webhook";
    return (
      <div data-testid="panel-webhook-logs">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#FF192C] font-semibold mb-1">Delivery Log</p>
            <h2 className="text-xl font-bold text-[#F5F5F7] uppercase tracking-tight">{hookName}</h2>
          </div>
          <Button variant="ghost" onClick={() => setViewLogs(null)} data-testid="button-back-webhooks">
            <X className="w-4 h-4 mr-2" /> Back
          </Button>
        </div>
        <div className="space-y-2">
          {logsData.map((log) => (
            <div
              key={log.id}
              className="p-4 rounded-md bg-[#141416] border border-white/5 flex flex-wrap items-center justify-between gap-3"
              data-testid={`card-log-${log.id}`}
            >
              <div className="flex items-center gap-3">
                {log.success ? (
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                )}
                <Badge className={`border-0 no-default-hover-elevate no-default-active-elevate text-xs ${log.success ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                  {log.statusCode || "ERR"}
                </Badge>
                <span className="text-[#F5F5F7] text-sm font-medium">{log.event}</span>
              </div>
              <div className="flex items-center gap-4">
                {log.duration && (
                  <span className="text-[#B3B3B8]/50 text-xs">{log.duration}ms</span>
                )}
                <span className="text-[#B3B3B8]/50 text-xs">
                  {new Date(log.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
          {logsData.length === 0 && (
            <p className="text-center py-8 text-[#B3B3B8]/50 text-sm" data-testid="text-no-logs">No delivery logs yet.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div data-testid="panel-integrations">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#FF192C] font-semibold mb-1">Integrations</p>
          <h2 className="text-xl font-bold text-[#F5F5F7] uppercase tracking-tight">Webhooks</h2>
          <p className="text-[#B3B3B8]/60 text-sm mt-1">Connect your CRM to Zapier, Make, or custom systems</p>
        </div>
        {!showAdd && (
          <Button onClick={() => { setShowAdd(true); setEditingId(null); setForm({ name: "", url: "", events: [], active: true }); }} data-testid="button-add-webhook">
            <Plus className="w-4 h-4 mr-2" /> Add Webhook
          </Button>
        )}
      </div>

      {showAdd && (
        <div className="mb-8 p-6 rounded-md bg-[#141416] border border-white/5" data-testid="form-webhook">
          <h3 className="text-sm uppercase tracking-[0.1em] font-semibold text-[#F5F5F7] mb-4">
            {editingId ? "Edit Webhook" : "New Webhook"}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-[#B3B3B8] uppercase tracking-wider mb-1 block">Name</label>
              <Input
                value={form.name}
                onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Zapier Lead Notification"
                className="bg-[#0B0B0D] border-white/10 text-[#F5F5F7]"
                data-testid="input-webhook-name"
              />
            </div>
            <div>
              <label className="text-xs text-[#B3B3B8] uppercase tracking-wider mb-1 block">Endpoint URL</label>
              <Input
                value={form.url}
                onChange={(e) => setForm(f => ({ ...f, url: e.target.value }))}
                placeholder="https://hooks.zapier.com/..."
                className="bg-[#0B0B0D] border-white/10 text-[#F5F5F7]"
                data-testid="input-webhook-url"
              />
            </div>
            <div>
              <label className="text-xs text-[#B3B3B8] uppercase tracking-wider mb-2 block">Events</label>
              <div className="flex flex-wrap gap-2">
                {webhookEvents.map((event) => (
                  <Badge
                    key={event}
                    className={`cursor-pointer border-0 text-xs ${
                      form.events.includes(event)
                        ? "bg-[#FF192C]/20 text-[#FF192C]"
                        : "bg-white/5 text-[#B3B3B8]/50"
                    }`}
                    onClick={() => toggleEvent(event)}
                    data-testid={`badge-event-${event}`}
                  >
                    {event}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button onClick={handleSubmit} disabled={createWebhook.isPending || updateWebhook.isPending} data-testid="button-save-webhook">
                {(createWebhook.isPending || updateWebhook.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editingId ? "Update" : "Create"}
              </Button>
              <Button variant="ghost" onClick={cancelForm} data-testid="button-cancel-webhook">Cancel</Button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {webhooksData.map((hook) => (
          <div
            key={hook.id}
            className="p-5 rounded-md bg-[#141416] border border-white/5"
            data-testid={`card-webhook-${hook.id}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="text-[#F5F5F7] font-semibold text-sm">{hook.name}</span>
                  <Badge className={`border-0 no-default-hover-elevate no-default-active-elevate text-xs ${hook.active ? "bg-green-500/20 text-green-400" : "bg-white/5 text-[#B3B3B8]/50"}`}>
                    {hook.active ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <p className="text-[#B3B3B8]/50 text-xs mb-3 break-all">{hook.url}</p>
                <div className="flex flex-wrap gap-1.5">
                  {(hook.events || []).map((ev) => (
                    <Badge key={ev} className="bg-white/5 text-[#B3B3B8] border-0 no-default-hover-elevate no-default-active-elevate text-xs">
                      {ev}
                    </Badge>
                  ))}
                </div>
                <div className="mt-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[#B3B3B8]/40 text-xs uppercase tracking-wider">Secret</span>
                    {showSecret === hook.id ? (
                      <div className="flex items-center gap-2">
                        <code className="text-[#B3B3B8] text-xs bg-[#0B0B0D] px-2 py-1 rounded font-mono break-all">{hook.secret}</code>
                        <Button variant="ghost" size="icon" onClick={() => setShowSecret(null)} data-testid={`button-hide-secret-${hook.id}`}>
                          <EyeOff className="w-3 h-3 text-[#B3B3B8]" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => { navigator.clipboard.writeText(hook.secret); toast({ title: "Secret copied" }); }} data-testid={`button-copy-secret-${hook.id}`}>
                          <Copy className="w-3 h-3 text-[#B3B3B8]" />
                        </Button>
                      </div>
                    ) : (
                      <Button variant="ghost" size="icon" onClick={() => setShowSecret(hook.id)} data-testid={`button-show-secret-${hook.id}`}>
                        <Eye className="w-3 h-3 text-[#B3B3B8]" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => updateWebhook.mutate({ id: hook.id, data: { active: !hook.active } })}
                  data-testid={`button-toggle-${hook.id}`}
                >
                  {hook.active ? <ToggleRight className="w-4 h-4 text-green-400" /> : <ToggleLeft className="w-4 h-4 text-[#B3B3B8]/50" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => testWebhook.mutate(hook.id)}
                  disabled={testWebhook.isPending}
                  data-testid={`button-test-${hook.id}`}
                >
                  {testWebhook.isPending ? <Loader2 className="w-4 h-4 animate-spin text-[#B3B3B8]" /> : <Play className="w-4 h-4 text-[#B3B3B8]" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setViewLogs(hook.id)} data-testid={`button-logs-${hook.id}`}>
                  <Clock className="w-4 h-4 text-[#B3B3B8]" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => startEdit(hook)} data-testid={`button-edit-${hook.id}`}>
                  <Settings className="w-4 h-4 text-[#B3B3B8]" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => deleteWebhook.mutate(hook.id)} data-testid={`button-delete-webhook-${hook.id}`}>
                  <Trash2 className="w-4 h-4 text-red-400" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        {webhooksData.length === 0 && !showAdd && (
          <div className="text-center py-12" data-testid="text-no-webhooks">
            <Zap className="w-8 h-8 text-[#B3B3B8]/20 mx-auto mb-3" />
            <p className="text-[#B3B3B8]/50 text-sm mb-1">No webhooks configured</p>
            <p className="text-[#B3B3B8]/30 text-xs">Add a webhook to send real-time data to Zapier, Make, or your own systems</p>
          </div>
        )}
      </div>
    </div>
  );
}
