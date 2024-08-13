/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gainsboro: "#dcdcdc",
        dash:"#292929",
        upload :"#7C7C7C",
        mantash:"#102039",
        ai:"#2268D1",
        primary : "#F3F0F0",
        black: "#000",
        whitesmoke: "#f2f2f2",
        darkslategray: "#333",
        white: "#fff",
        gray: "rgba(0, 0, 0, 0.29)",
      },
      spacing: {},
      fontFamily: {
        poppins: "Poppins",
      },
      borderRadius: {
        "31xl": "50px",
        xl: "20px",
      },
    },
    fontSize: {
      base: "16px",
      xl: "20px",
      inherit: "inherit",
    },
    screens: {
      mq925: {
        raw: "screen and (max-width: 925px)",
      },
      mq700: {
        raw: "screen and (max-width: 700px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
