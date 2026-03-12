import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Calendar, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface InsightItem {
  id: number;
  title: string;
  summary: string;
  author: string;
  date: string;
  category: "Blog" | "Case Study" | "Scheme Update" | "RCM Insight";
  readTime: string;
}

const insightData: InsightItem[] = [
  {
    id: 1,
    title: "5 Ways to Improve Clean Claim Rate in Your Hospital",
    summary:
      "Discover the most effective strategies to achieve 95%+ clean claim rates through better documentation, coding accuracy, and pre-authorization management.",
    author: "Dr. Priya Sharma",
    date: "Feb 15, 2026",
    category: "Blog",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "NABH 6th Edition: What Every Hospital Needs to Know",
    summary:
      "A comprehensive guide to the latest NABH 6th Edition standards, key changes from the 5th edition, and practical implementation strategies.",
    author: "Rajesh Nair",
    date: "Feb 10, 2026",
    category: "Blog",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "Digital Health Records: The Future is Now",
    summary:
      "How ABDM and ABHA are transforming health record management and what hospitals need to do to stay ahead in India's digital health revolution.",
    author: "Anita Patel",
    date: "Jan 28, 2026",
    category: "Blog",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "How a Leading Hospital Achieved 98% Clean Claim Rate",
    summary:
      "A hospital's transformation story: from 68% to 98% clean claim rate in 6 months using AI Health Zon's RCM automation platform.",
    author: "Case Study Team",
    date: "Jan 20, 2026",
    category: "Case Study",
    readTime: "10 min read",
  },
  {
    id: 5,
    title: "NABH Certification Journey: A Tier-2 Hospital Success Story",
    summary:
      "How a 100-bed hospital in Pune achieved NABH certification in just 8 months with AI Health Zon's compliance framework and audit support.",
    author: "Dr. Suresh Kumar",
    date: "Jan 15, 2026",
    category: "Case Study",
    readTime: "12 min read",
  },
  {
    id: 6,
    title: "Ayushman Bharat PM-JAY New Guidelines 2024",
    summary:
      "Summary of the latest PM-JAY guidelines covering package rates revision, new empanelment criteria, pre-authorization norms, and claim submission requirements.",
    author: "Policy Updates Team",
    date: "Feb 20, 2026",
    category: "Scheme Update",
    readTime: "7 min read",
  },
  {
    id: 7,
    title: "CGHS Updates for Empanelled Hospitals — Q1 2026",
    summary:
      "Key changes in CGHS empanelment norms, revised package rates, new documentation requirements, and updated billing guidelines for government employees.",
    author: "Policy Updates Team",
    date: "Feb 5, 2026",
    category: "Scheme Update",
    readTime: "5 min read",
  },
  {
    id: 8,
    title: "ECHS Empanelment: New Criteria and Documentation",
    summary:
      "Updated ECHS empanelment criteria for hospitals serving ex-servicemen, revised package structures, and digital claims submission requirements.",
    author: "Policy Updates Team",
    date: "Jan 25, 2026",
    category: "Scheme Update",
    readTime: "4 min read",
  },
  {
    id: 9,
    title: "Revenue Cycle Optimization: 10 Strategies That Work",
    summary:
      "Data-driven strategies to optimize your hospital's revenue cycle — from patient registration to final payment, covering all key touchpoints in the RCM journey.",
    author: "Vikram Singh",
    date: "Feb 18, 2026",
    category: "RCM Insight",
    readTime: "9 min read",
  },
  {
    id: 10,
    title: "Reducing Claim Denials by 40%: A Practical Guide",
    summary:
      "Root cause analysis of the top denial categories and actionable strategies to prevent them — with real data from our network of 500+ hospitals.",
    author: "RCM Analytics Team",
    date: "Feb 8, 2026",
    category: "RCM Insight",
    readTime: "8 min read",
  },
  {
    id: 11,
    title: "Pre-Authorization Best Practices for Surgeons",
    summary:
      "A surgeon's guide to smoother pre-authorization: documentation essentials, ICD coding tips, medical necessity justification, and insurer communication strategies.",
    author: "Dr. Meera Iyer",
    date: "Jan 30, 2026",
    category: "RCM Insight",
    readTime: "6 min read",
  },
  {
    id: 12,
    title: "ICD-10 Coding Errors: Top 10 Mistakes and How to Fix Them",
    summary:
      "The most common ICD-10 coding errors causing claim rejections, with step-by-step guidance on correct coding practices and quality check processes.",
    author: "Clinical Coding Team",
    date: "Jan 22, 2026",
    category: "RCM Insight",
    readTime: "7 min read",
  },
];

const categoryColors: Record<string, string> = {
  Blog: "bg-blue-100 text-blue-700",
  "Case Study": "bg-green-100 text-green-700",
  "Scheme Update": "bg-amber-100 text-amber-700",
  "RCM Insight": "bg-purple-100 text-purple-700",
};

function InsightCard({
  insight,
  index,
}: { insight: InsightItem; index: number }) {
  const handleReadMore = () => {
    window.open(`/insights/${insight.id}`, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      className="bg-white rounded-xl border border-border shadow-xs card-hover flex flex-col overflow-hidden"
    >
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <Badge
            className={`text-xs ${categoryColors[insight.category]} border-0`}
          >
            {insight.category}
          </Badge>
          <span className="text-muted-foreground text-xs">
            {insight.readTime}
          </span>
        </div>
        <h3 className="font-heading font-bold text-foreground text-base mb-2 leading-snug">
          {insight.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
          {insight.summary}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {insight.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {insight.date}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReadMore}
            className="text-health-blue hover:text-health-blue/80 text-xs h-7 px-2 cursor-pointer"
          >
            Read More <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function Insights() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered =
    activeTab === "all"
      ? insightData
      : insightData.filter((i) => {
          const map: Record<string, string> = {
            blogs: "Blog",
            "case-studies": "Case Study",
            "scheme-updates": "Scheme Update",
            "rcm-insights": "RCM Insight",
          };
          return i.category === map[activeTab];
        });

  return (
    <Layout section="insights">
      {/* Hero */}
      <section className="pt-20 health-gradient">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 text-white/80 text-xs rounded-full mb-4 uppercase tracking-wider">
              Knowledge Hub
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
              Healthcare Knowledge Centre
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Insights, case studies, regulatory updates, and best practices
              from India's leading healthcare digital ecosystem.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Insights Grid */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-3 sm:grid-cols-5 gap-1 h-auto p-1 bg-muted rounded-xl">
                <TabsTrigger
                  value="all"
                  className="text-xs px-3 py-2 rounded-lg"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="blogs"
                  className="text-xs px-3 py-2 rounded-lg"
                >
                  Blogs
                </TabsTrigger>
                <TabsTrigger
                  value="case-studies"
                  className="text-xs px-3 py-2 rounded-lg"
                >
                  Case Studies
                </TabsTrigger>
                <TabsTrigger
                  value="scheme-updates"
                  className="text-xs px-3 py-2 rounded-lg"
                >
                  Scheme Updates
                </TabsTrigger>
                <TabsTrigger
                  value="rcm-insights"
                  className="text-xs px-3 py-2 rounded-lg"
                >
                  RCM Insights
                </TabsTrigger>
              </TabsList>
            </div>

            {[
              "all",
              "blogs",
              "case-studies",
              "scheme-updates",
              "rcm-insights",
            ].map((tab) => (
              <TabsContent key={tab} value={tab}>
                {filtered.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No insights found for this category.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filtered.map((insight, i) => (
                      <InsightCard
                        key={insight.id}
                        insight={insight}
                        index={i}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-3">
            Stay Updated
          </h2>
          <p className="text-muted-foreground mb-6">
            Subscribe to receive the latest healthcare insights, regulatory
            updates, and RCM best practices directly in your inbox.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2.5 text-sm rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-health-blue/30 bg-muted/30"
            />
            <Button className="bg-health-blue hover:bg-health-blue/90 text-white px-5">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
