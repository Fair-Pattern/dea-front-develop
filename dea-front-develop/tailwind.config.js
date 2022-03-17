module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          darkest: "#000F1C",
          dark: "#00223D",
        },
        red: {
          dark: "#BE1E2D",
          medium: "#F6C4C4",
          lighter: "#A25858",
        },
        gray: {
          dark: "#929292",
          semidark: "#B2B2B2",
          ash: "#707070"
        },
        white: "#ffffff",
        amor: "#dcdbdc"
      },
      boxShadow: {
        'card': "rgba(14, 30, 37, 0.12) 0px 2px 16px 2px, rgba(14, 30, 37, 0.32) 0px 2px 16px 2px"
      },
      spacing: {
        '120': '480px',
        '124': '496px',
        '130': '520px',
        '140': '560px',
        '160': '640px',
      },
      backgroundImage: {
        'profile': "url('/images/profile.png')",
        'profile-icon': "url('/images/profile-icon.png')",
        'user-profile': "url('/images/user-profile.png')",
        'card-background': "url('/images/card-background.png')",
        'gradient': "url('/images/gradient.png')"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
