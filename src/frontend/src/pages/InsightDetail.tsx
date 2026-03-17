import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { insightArticles } from "@/data/insightArticles";
import type { ArticleSection } from "@/data/insightArticles";
import { useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock, Tag, User } from "lucide-react";
import { motion } from "motion/react";

const categoryColors: Record<string, string> = {
  Blog: "bg-blue-100 text-blue-700",
  "Case Study": "bg-green-100 text-green-700",
  "Scheme Update": "bg-amber-100 text-amber-700",
  "RCM Insight": "bg-purple-100 text-purple-700",
};

function renderSection(section: ArticleSection, idx: number) {
  switch (section.type) {
    case "paragraph":
      return (
        <p
          key={idx}
          className="text-muted-foreground leading-relaxed text-base"
        >
          {section.text}
        </p>
      );

    case "heading":
      return (
        <h2
          key={idx}
          className="font-heading text-xl font-bold text-foreground mt-8 mb-2"
        >
          {section.text}
        </h2>
      );

    case "subheading":
      return (
        <h3
          key={idx}
          className="font-heading text-lg font-semibold text-foreground mt-5 mb-1"
        >
          {section.text}
        </h3>
      );

    case "bullet-list":
      return (
        <ul
          key={idx}
          className="list-disc list-inside space-y-2 text-muted-foreground"
        >
          {section.items?.map((item) => (
            <li key={item} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );

    case "numbered-list":
      return (
        <ol
          key={idx}
          className="list-decimal list-inside space-y-2 text-muted-foreground"
        >
          {section.items?.map((item) => (
            <li key={item} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ol>
      );

    case "highlight-box":
      return (
        <div
          key={idx}
          className="bg-health-blue/8 border-l-4 border-health-blue rounded-r-lg px-5 py-4 my-2"
        >
          <p className="text-health-blue font-medium leading-relaxed text-sm">
            {section.text}
          </p>
        </div>
      );

    case "stat-grid":
      return (
        <div key={idx} className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-4">
          {section.stats?.map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-border rounded-xl p-4 text-center shadow-xs"
            >
              <div className="text-2xl font-bold text-health-blue font-heading">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground mt-1 leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}

export function InsightDetail() {
  const { id } = useParams({ strict: false }) as { id: string };
  const article = insightArticles.find((a) => a.id === Number(id));

  if (!article) {
    return (
      <Layout section="insights">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
              Article Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The article you're looking for doesn't exist.
            </p>
            <Button
              onClick={() => window.close()}
              className="bg-health-blue hover:bg-health-blue/90 text-white"
            >
              Close Tab
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout section="insights">
      {/* Hero */}
      <section className="pt-20 health-gradient">
        <div className="max-w-3xl mx-auto px-4 py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge
              className={`text-xs mb-4 border-0 ${categoryColors[article.category]}`}
            >
              {article.category}
            </Badge>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              {article.title}
            </h1>
            <p className="text-white/70 text-base leading-relaxed mb-6">
              {article.summary}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      {article.heroImage && (
        <div className="max-w-3xl mx-auto px-4 -mt-6 pb-2">
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full rounded-xl object-cover shadow-lg"
            style={{ maxHeight: "320px" }}
          />
        </div>
      )}

      {/* Article Body */}
      <section className="py-12 bg-background">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="space-y-5"
          >
            {article.content.map((section, idx) => renderSection(section, idx))}
          </motion.div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-border">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-muted-foreground" />
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-muted text-muted-foreground rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Close / Back */}
          <div className="mt-10 flex justify-start">
            <Button
              variant="outline"
              onClick={() => window.close()}
              className="flex items-center gap-2 text-health-blue border-health-blue hover:bg-health-blue/5"
            >
              <ArrowLeft className="w-4 h-4" />
              Close Tab
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
