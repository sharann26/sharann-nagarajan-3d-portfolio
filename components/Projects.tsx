import { motion } from "framer-motion";
import {
  Code2,
  Folder,
  Layers,
  Monitor,
  MonitorSmartphone,
  TabletSmartphone,
} from "lucide-react";
import React from "react";
import { PROJECTS } from "../constants";

const Projects: React.FC = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto" id="projects">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-300 text-xs font-bold uppercase tracking-widest mb-4 border border-violet-200 dark:border-violet-500/20"
          >
            <Layers size={14} />
            <span>Engineering Showcase</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white leading-tight"
          >
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">
              Projects.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-600 dark:text-slate-400 font-medium text-lg"
          >
            A selection of technical solutions, focusing on scalability,
            performance, and user experience.
          </motion.p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative flex flex-col justify-between bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden transition-all duration-300 hover:border-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/10"
          >
            {/* Abstract Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-violet-500/10 transition-colors duration-500" />

            {/* Top Row: Folder Icon & Links */}
            <div className="relative flex justify-between items-start mb-8 z-10">
              <div className="p-3 bg-violet-50 dark:bg-violet-500/10 rounded-2xl text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-500/20 group-hover:scale-110 transition-transform duration-300">
                {project.icon === "WEB" ? (
                  <Monitor size={28} strokeWidth={1.5} />
                ) : project.icon === "MOBILE" ? (
                  <TabletSmartphone size={28} strokeWidth={1.5} />
                ) : project.icon === "BOTH" ? (
                  <MonitorSmartphone size={28} strokeWidth={1.5} />
                ) : (
                  <Folder size={28} strokeWidth={1.5} />
                )}
              </div>
            </div>

            {/* Middle Row: Content */}
            <div className="relative z-10 mb-8">
              <h3 className="text-2xl font-black text-slate-950 dark:text-white mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm font-medium">
                {project.description}
              </p>
            </div>

            {/* Bottom Row: Tech Stack */}
            <div className="relative z-10 pt-6 border-t border-slate-100 dark:border-white/5 mt-auto">
              <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-mono font-semibold text-slate-500 dark:text-slate-500">
                {project.tags.map((tag, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${tag.color.replace("text-", "bg-")}`}
                    />
                    <span className="group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                      {tag.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Watermark Icon (Visual Flair) */}
            <div className="absolute -bottom-4 -right-4 opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-[0.08] dark:group-hover:opacity-[0.1] group-hover:scale-110 transition-all duration-500 rotate-12 pointer-events-none">
              <Code2 size={180} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
