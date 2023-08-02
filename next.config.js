const path = require("path");

module.exports = {
  env: {
    apiDomain: "https://76d0-2402-800-61cb-89a5-8469-27ca-4b6c-638e.ngrok.io",
    baseUrl: "http://localhost:3000",
    pageLength: 5,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "game-addict.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
