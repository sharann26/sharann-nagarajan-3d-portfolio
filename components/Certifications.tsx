import { motion } from "framer-motion";
import { Award } from "lucide-react";
import React from "react";
import { CERTIFICATIONS } from "../constants";

const Certifications: React.FC<{ theme: "dark" | "light" }> = ({ theme }) => {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <p
          className={`text-sm uppercase tracking-widest ${theme === "dark" ? "text-slate-500" : "text-slate-600"} mb-2`}
        >
          Verified Excellence
        </p>
        <h2
          className={`text-4xl font-extrabold ${theme === "dark" ? "text-white" : "text-slate-950"}`}
        >
          Certifications.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CERTIFICATIONS.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{
              rotateY: 10,
              rotateX: -5,
              z: 20,
              boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.25)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`group relative p-8 ${theme === "dark" ? "bg-slate-900/40 border border-white/10 shadow-none" : "bg-slate-50 border border-slate-300 shadow-xl shadow-slate-200/50"} backdrop-blur-md rounded-2xl overflow-hidden cursor-default perspective-1000`}
          >
            {/* Background Glow */}
            <div
              className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${cert.color} blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity`}
            />

            <div className="relative z-10">
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${cert.color} text-white mb-6 shadow-lg`}
              >
                <Award className="w-6 h-6" />
              </div>

              <h3
                className={`text-xl font-bold mb-2 group-hover:text-emerald-500 transition-colors ${theme === "dark" ? "text-white" : "text-slate-950"}`}
              >
                {cert.title}
              </h3>
              <p
                className={`${theme === "dark" ? "text-slate-400" : "text-slate-700"} font-bold text-sm mb-4`}
              >
                {cert.issuer} • {cert.date}
              </p>
              <p
                className={`text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-700"} leading-relaxed`}
              >
                {cert.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
