// Export a Tailwind CSS configuration object
module.exports = {
  // Specify the content files to scan for classes
  content: ["./dist/index.html", "./dist/script.js", "./dist/style.css"],
  theme: {
    extend: {
      // Extend the default theme with custom values
      textShadow: {
        // Medium text shadow
        md: "0 0 10px rgba(0, 0, 0, 0.2)"
      }
    }
  },
  plugins: []
}