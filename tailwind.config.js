/** @type {import('tailwindcss').Config} */
const t = (v) => `rgb(var(--${v}) / <alpha-value>)`;

export default {
  darkMode: "class", // App.tsx toggles <html class="dark">  (dark = LAB, light = DESERT SUN)
  content: ["./index.html", "./App.tsx", "./constants.tsx", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        headline: ['"Space Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
        display: ['"Space Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        script1: ["\"Script1 Script Casual\"", "\"Brush Script MT\"", "cursive"],
        brush: ["\"Dancing Script\"", "\"Brush Script MT\"", "cursive"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      // Semantic tokens. Dark values are the exact hexes from code.md; light values live in index.css.
      colors: {
        canvas: t("base"), // page (named canvas: "base" would hijack Tailwind text-base)
        surf: t("surf"), // #131313 bands / header
        low: t("low"), // #1c1b1b panels
        lowest: t("lowest"), // #0e0e0e insets
        line: t("line"), // #2a2a2a
        line2: t("line2"), // #3b4b3a
        mute: t("mute"), // #849581
        soft: t("soft"), // #b9ccb5
        txt: t("txt"), // #e5e2e1
        hi: t("hi"), // "white" headings
        s2: t("s2"), // slate-200
        s3: t("s3"), // slate-300
        s4: t("s4"), // slate-400
        g: t("g"), // #00ff66
        a: t("a"), // #f5a623
        c: t("c"), // #00e5ff
        sky: t("sky"), // #7FA9C3
        ib: t("ib"), // #007cc3
        ibt: t("ibt"),
        pu: t("pu"), // #8574b8
        put: t("put"),
        fg: t("fg"), // text on accent fills
        hovbg: t("hovbg"),
        hovfg: t("hovfg"),
        // legacy names (used only by the disabled ChatBot)
        bg: t("base"), bay: t("low"), cell: t("low"), sunken: t("lowest"), rule: t("line"),
        ink: t("hi"), ink2: t("soft"), onsig: t("fg"),
        toxic: { DEFAULT: t("g"), t: t("g") }, rust: { DEFAULT: t("a"), t: t("a") }, cryo: { DEFAULT: t("c"), t: t("c") },
      },
      boxShadow: {
        hard: "3px 3px 0 0 rgb(var(--hard))",
        "hard-lg": "6px 6px 0 0 rgb(var(--hard))",
        "hard-sm": "2px 2px 0 0 rgb(var(--hard))",
      },
      letterSpacing: { label: "0.14em" },
      keyframes: {
        blink: { "0%,49%": { opacity: "1" }, "50%,100%": { opacity: "0" } },
      },
      animation: { blink: "blink 1.1s steps(1) infinite" },
    },
  },
  plugins: [],
};
