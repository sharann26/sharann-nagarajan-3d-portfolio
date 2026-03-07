import { motion } from "framer-motion";
import React from "react";
import { EXPERIENCES } from "../constants";
import { Experience } from "../types";

interface ExperienceProps {
  theme: "dark" | "light";
}

// --- DESKTOP VIEW COMPONENT ---
const DesktopExperienceCard: React.FC<{
  experience: Experience;
  index: number;
  theme: "dark" | "light";
}> = ({ experience, index, theme }) => {
  const isEven = index % 2 === 0;

  return (
    <div className="relative mb-32 flex items-center w-full justify-center group">
      {/* Central Connector Circle with Logo */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className={`w-16 h-16 rounded-2xl border-4 ${theme === "dark" ? "border-slate-900" : "border-slate-200"} bg-white shadow-2xl overflow-hidden flex items-center justify-center p-2 relative z-20 transition-transform duration-500 group-hover:scale-110`}
        >
          <img
            src={experience.icon}
            alt={experience.company}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://cdn.simpleicons.org/enterprise/808080";
            }}
          />
        </motion.div>
      </div>

      {/* Content Card */}
      <div
        className={`w-[42%] flex ${isEven ? "mr-auto justify-end pr-12" : "ml-auto justify-start pl-12"}`}
      >
        <motion.div
          initial={{ x: isEven ? -50 : 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
          className={`relative border ${theme === "dark" ? "bg-slate-900/60 border-white/10 shadow-none" : "bg-slate-50 border-slate-300 shadow-xl shadow-slate-200/50"} backdrop-blur-2xl p-8 rounded-[32px] hover:border-emerald-500/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 w-full`}
        >
          {/* Connector Line to Center */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 w-12 h-[2px] bg-gradient-to-r from-emerald-500/50 to-transparent ${isEven ? "-right-12 rotate-180" : "-left-12"}`}
          />

          {/* Accent Line (Bottom) */}
          <div className="absolute bottom-0 left-8 right-8 h-1.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-[1px]" />

          <div className="flex flex-col gap-1 mb-6">
            <span className="text-[10px] font-black tracking-[0.2em] text-emerald-600 uppercase">
              {experience.date}
            </span>
            <h3
              className={`text-2xl font-black ${theme === "dark" ? "text-white" : "text-slate-950"} leading-tight`}
            >
              {experience.title}
            </h3>
            <p
              className={`${theme === "dark" ? "text-slate-500" : "text-slate-700"} font-bold text-sm tracking-wide`}
            >
              {experience.company}
            </p>
          </div>

          <ul className={`space-y-3 flex flex-col`}>
            {experience.points.map((point, idx) => (
              <li
                key={idx}
                className={`flex gap-3 text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-700"} leading-relaxed group/item`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0 group-hover/item:scale-150 transition-transform" />
                {point}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

// --- MOBILE VIEW COMPONENT ---
const MobileExperienceCard: React.FC<{
  experience: Experience;
  index: number;
  isLast: boolean;
  theme: "dark" | "light";
}> = ({ experience, index, isLast, theme }) => {
  return (
    <div className="flex gap-6">
      {/* Timeline Column */}
      <div className="flex flex-col items-center">
        {/* Icon Node */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="w-14 h-14 rounded-2xl bg-white border-2 border-emerald-500 shadow-[0_0_15px_rgba(139,92,246,0.2)] flex items-center justify-center p-2.5 z-10 shrink-0"
        >
          <img
            src={experience.icon}
            alt={experience.company}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://cdn.simpleicons.org/enterprise/808080";
            }}
          />
        </motion.div>

        {/* Connecting Line */}
        {!isLast && (
          <div
            className={`w-[2px] flex-grow bg-gradient-to-b from-emerald-500 via-fuchsia-500/50 ${theme === "dark" ? "to-slate-800" : "to-slate-200"} my-2`}
          />
        )}
      </div>

      {/* Content Column */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="pb-12 flex-grow min-w-0"
      >
        <div
          className={`${theme === "dark" ? "bg-slate-900/60 border border-white/10 shadow-none" : "bg-white border border-slate-200 shadow-slate-200/50"} backdrop-blur-xl rounded-2xl rounded-tl-sm p-6 relative overflow-hidden group`}
        >
          {/* Decorative Top Bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-500" />

          {/* Header */}
          <div className="mb-4">
            <span
              className={`inline-block px-2.5 py-0.5 rounded-md ${theme === "dark" ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20" : "bg-emerald-100 text-emerald-600 border border-emerald-200"} text-[10px] font-bold uppercase tracking-wider mb-2`}
            >
              {experience.date}
            </span>
            <h3
              className={`text-xl font-black ${theme === "dark" ? "text-white" : "text-slate-950"} leading-tight mb-1`}
            >
              {experience.title}
            </h3>
            <p
              className={`text-sm font-bold ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
            >
              {experience.company}
            </p>
          </div>

          {/* Points */}
          <ul className="space-y-3">
            {experience.points.map((point, idx) => (
              <li
                key={idx}
                className={`flex gap-3 text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-600"} leading-relaxed`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 mt-1.5 shrink-0 shadow-sm" />
                {point}
              </li>
            ))}
          </ul>

          {/* Bottom Glow */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/10 blur-[40px] rounded-full group-hover:bg-emerald-500/20 transition-colors" />
        </div>
      </motion.div>
    </div>
  );
};

const ExperienceTimeline: React.FC<ExperienceProps> = ({ theme }) => {
  return (
    <div className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20 md:mb-32">
        <p
          className={`text-sm font-black uppercase tracking-[0.4em] ${theme === "dark" ? "text-slate-400" : "text-slate-500"} mb-4`}
        >
          Professional Odyssey
        </p>
        <h2
          className={`text-4xl md:text-6xl font-black ${theme === "dark" ? "text-white" : "text-slate-950"}`}
        >
          Experience.
        </h2>
      </div>

      {/* --- DESKTOP VIEW (>768px) --- */}
      <div className="hidden md:block relative">
        {/* Vertical Center Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent" />

        <div className="py-10">
          {EXPERIENCES.map((exp, index) => (
            <DesktopExperienceCard
              key={exp.id}
              experience={exp}
              index={index}
              theme={theme}
            />
          ))}
        </div>
      </div>

      {/* --- MOBILE VIEW (<768px) --- */}
      <div className="md:hidden">
        {EXPERIENCES.map((exp, index) => (
          <MobileExperienceCard
            key={exp.id}
            experience={exp}
            index={index}
            isLast={index === EXPERIENCES.length - 1}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;
