import { motion } from "framer-motion";
import React from "react";
import { SKILL_CATEGORIES } from "../constants";

const Skills: React.FC<{ theme: "dark" | "light" }> = ({ theme }) => {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto" id="skills">
      <div className="text-center mb-16">
        <p className="text-sm uppercase tracking-wider text-emerald-600 font-bold mb-2">
          Technical Arsenal
        </p>
        <h2
          className={`text-4xl font-extrabold ${theme === "dark" ? "text-white" : "text-slate-950"}`}
        >
          Skills.
        </h2>
      </div>

      <div
        className={`${theme === "dark" ? "bg-slate-900/30 border border-white/10 shadow-none" : "bg-slate-50 border border-slate-300 shadow-xl shadow-slate-200/50"} backdrop-blur-xl rounded-3xl overflow-hidden`}
      >
        {SKILL_CATEGORIES.map((category, idx) => (
          <div
            key={category.title}
            className={`flex flex-col md:flex-row items-center gap-8 p-8 ${
              idx !== SKILL_CATEGORIES.length - 1
                ? `border-b ${theme === "dark" ? "border-white/5" : "border-slate-300"}`
                : ""
            }`}
          >
            {/* Category Name */}
            <div className="w-full md:w-1/3 md:text-right">
              <h3
                className={`text-lg font-bold ${theme === "dark" ? "text-slate-300" : "text-slate-950"}`}
              >
                {category.title}
              </h3>
            </div>

            {/* Vertical Divider (Desktop) */}
            <div
              className={`hidden md:block w-[1px] h-12 ${theme === "dark" ? "bg-white/10" : "bg-slate-300"}`}
            />

            {/* Skills Grid */}
            <div className="flex flex-wrap justify-center md:justify-start gap-6 w-full md:w-2/3">
              {category.skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  whileHover={{ scale: 1.1 }}
                  className={`group relative flex items-center justify-center p-3 ${theme === "dark" ? "bg-slate-800 border border-slate-700 hover:border-emerald-500/50" : "bg-white border border-slate-200 hover:border-emerald-300"} rounded-xl shadow-sm hover:shadow-emerald-500/20 transition-all duration-300`}
                >
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-8 h-8 object-contain"
                    title={skill.name}
                  />
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {skill.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
