import { motion } from "framer-motion";
import React from "react";
import { STATS } from "../constants";

interface StatsProps {
  theme: "dark" | "light";
}

const Stats: React.FC<StatsProps> = ({ theme }) => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
        {STATS.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`group relative p-8 backdrop-blur-xl border rounded-[32px] overflow-hidden text-center hover:border-emerald-500/50 transition-all duration-300 ${theme === "dark" ? "bg-slate-900/40 border-white/10 shadow-none" : "bg-white border-slate-300 shadow-xl shadow-slate-200/50"}`}
          >
            {/* Hover Glow */}
            <div
              className={`absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-[32px] blur-xl opacity-0 group-hover:opacity-10 transition-opacity`}
            />

            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`p-4 rounded-2xl shadow-lg mb-6 group-hover:scale-110 transition-transform 
                  ${theme === "dark" ? "bg-slate-800 border border-slate-700" : "bg-slate-50 border border-slate-200"}`}
              >
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>

              <motion.span
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                className={`text-4xl md:text-5xl font-black mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}
              >
                {stat.value}
              </motion.span>

              <p
                className={`text-sm font-extrabold uppercase tracking-widest ${theme === "dark" ? "text-slate-400" : "text-slate-800"}`}
              >
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
