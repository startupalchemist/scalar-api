import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";
import { useLocation } from "wouter";
import type { Lead, Post, Subscriber, Newsletter } from "@shared/schema";
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

type TabKey = "dashboard" | "leads" | "blog" | "newsletter" | "users";

export default function Admin() {
  const { user, loading: authLoading, logout } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabKey>("dashboard");

  const [showNewPost, setShowNewPost] = useState(false);
  const [postForm, setPostForm] = useState({ title: "", content: "", excerpt: "", tags: "", seoTitle: "", seoDescription: "" });
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
            showNewPost={showNewPost}
            setShowNewPost={setShowNewPost}
            postForm={postForm}
            setPostForm={setPostForm}
            aiTopic={aiTopic}
            setAiTopic={setAiTopic}
            showAiForm={showAiForm}
            setShowAiForm={setShowAiForm}
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

  return (
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
                <td className="py-3 px-3 text-[#F5F5F7] font-medium">{lead.name}</td>
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

function BlogTab({
  toast,
  showNewPost,
  setShowNewPost,
  postForm,
  setPostForm,
  aiTopic,
  setAiTopic,
  showAiForm,
  setShowAiForm,
}: {
  toast: any;
  showNewPost: boolean;
  setShowNewPost: (v: boolean) => void;
  postForm: { title: string; content: string; excerpt: string; tags: string; seoTitle: string; seoDescription: string };
  setPostForm: (v: any) => void;
  aiTopic: string;
  setAiTopic: (v: string) => void;
  showAiForm: boolean;
  setShowAiForm: (v: boolean) => void;
}) {
  const { data: posts = [], isLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  const createPost = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("POST", "/api/posts", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({ title: "Post created" });
      setShowNewPost(false);
      setPostForm({ title: "", content: "", excerpt: "", tags: "", seoTitle: "", seoDescription: "" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const toggleStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      await apiRequest("PATCH", `/api/posts/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({ title: "Post updated" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const deletePost = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({ title: "Post deleted" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const generateArticle = useMutation({
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-[#FF192C] animate-spin" data-testid="loader-blog" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Button
          onClick={() => { setShowNewPost(!showNewPost); setShowAiForm(false); }}
          className="bg-[#FF192C] text-white"
          data-testid="button-new-post"
        >
          <Plus className="w-4 h-4 mr-2" /> New Post
        </Button>
        <Button
          variant="ghost"
          className="text-[#B3B3B8]"
          onClick={() => { setShowAiForm(!showAiForm); setShowNewPost(false); }}
          data-testid="button-ai-generate"
        >
          <Sparkles className="w-4 h-4 mr-2" /> AI Generate
        </Button>
      </div>

      {showAiForm && (
        <div className="p-6 rounded-md bg-[#141416] border border-white/5 mb-6" data-testid="form-ai-generate">
          <p className="text-xs uppercase tracking-[0.3em] text-[#B3B3B8]/50 mb-4">Generate with AI</p>
          <div className="flex flex-wrap gap-3">
            <Input
              placeholder="Enter topic..."
              value={aiTopic}
              onChange={(e) => setAiTopic(e.target.value)}
              className="flex-1 min-w-[200px] bg-[#0B0B0D] border-white/10 text-[#F5F5F7]"
              data-testid="input-ai-topic"
            />
            <Button
              onClick={() => aiTopic.trim() && generateArticle.mutate(aiTopic.trim())}
              disabled={generateArticle.isPending || !aiTopic.trim()}
              className="bg-[#FF192C] text-white"
              data-testid="button-ai-submit"
            >
              {generateArticle.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
              Generate
            </Button>
          </div>
        </div>
      )}

      {showNewPost && (
        <div className="p-6 rounded-md bg-[#141416] border border-white/5 mb-6" data-testid="form-new-post">
          <p className="text-xs uppercase tracking-[0.3em] text-[#B3B3B8]/50 mb-4">New Post</p>
          <div className="space-y-4">
            <Input
              placeholder="Title"
              value={postForm.title}
              onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
              className="bg-[#0B0B0D] border-white/10 text-[#F5F5F7]"
              data-testid="input-post-title"
            />
            <Textarea
              placeholder="Content"
              value={postForm.content}
              onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
              className="bg-[#0B0B0D] border-white/10 text-[#F5F5F7] min-h-[150px]"
              data-testid="input-post-content"
            />
            <Input
              placeholder="Excerpt"
              value={postForm.excerpt}
              onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
              className="bg-[#0B0B0D] border-white/10 text-[#F5F5F7]"
              data-testid="input-post-excerpt"
            />
            <Input
              placeholder="Tags (comma-separated)"
              value={postForm.tags}
              onChange={(e) => setPostForm({ ...postForm, tags: e.target.value })}
              className="bg-[#0B0B0D] border-white/10 text-[#F5F5F7]"
              data-testid="input-post-tags"
            />
            <Input
              placeholder="SEO Title"
              value={postForm.seoTitle}
              onChange={(e) => setPostForm({ ...postForm, seoTitle: e.target.value })}
              className="bg-[#0B0B0D] border-white/10 text-[#F5F5F7]"
              data-testid="input-post-seo-title"
            />
            <Input
              placeholder="SEO Description"
              value={postForm.seoDescription}
              onChange={(e) => setPostForm({ ...postForm, seoDescription: e.target.value })}
              className="bg-[#0B0B0D] border-white/10 text-[#F5F5F7]"
              data-testid="input-post-seo-description"
            />
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => {
                  if (!postForm.title.trim()) return;
                  createPost.mutate({
                    title: postForm.title,
                    content: postForm.content,
                    excerpt: postForm.excerpt || null,
                    tags: postForm.tags ? postForm.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
                    seoTitle: postForm.seoTitle || null,
                    seoDescription: postForm.seoDescription || null,
                  });
                }}
                disabled={createPost.isPending || !postForm.title.trim()}
                className="bg-[#FF192C] text-white"
                data-testid="button-post-submit"
              >
                {createPost.isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                Create Post
              </Button>
              <Button variant="ghost" className="text-[#B3B3B8]" onClick={() => setShowNewPost(false)} data-testid="button-post-cancel">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-5 rounded-md bg-[#141416] border border-white/5 flex flex-wrap items-center justify-between gap-4"
            data-testid={`card-post-${post.id}`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <span className="text-[#F5F5F7] font-semibold text-sm" data-testid={`text-post-title-${post.id}`}>
                  {post.title}
                </span>
                <Badge
                  className={`text-xs border-0 no-default-hover-elevate no-default-active-elevate ${post.status === "published" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}
                  data-testid={`badge-post-status-${post.id}`}
                >
                  {post.status}
                </Badge>
              </div>
              <p className="text-xs text-[#B3B3B8]/40">
                {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  toggleStatus.mutate({
                    id: post.id,
                    status: post.status === "published" ? "draft" : "published",
                  })
                }
                data-testid={`button-toggle-post-${post.id}`}
              >
                {post.status === "published" ? (
                  <EyeOff className="w-4 h-4 text-[#B3B3B8]" />
                ) : (
                  <Eye className="w-4 h-4 text-green-400" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deletePost.mutate(post.id)}
                data-testid={`button-delete-post-${post.id}`}
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </Button>
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <p className="text-center py-12 text-[#B3B3B8]/50 text-sm" data-testid="text-no-posts">No posts yet.</p>
        )}
      </div>
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
            {Number(u.id) !== Number(currentUserId) && (isRoot || u.role !== "root") && (
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
