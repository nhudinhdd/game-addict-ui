const path = require("path");

module.exports = {
  env: {
    apiDomain: "http://localhost:8080",
    baseUrl: "http://localhost:3000",
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
