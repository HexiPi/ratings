{
  "name": "ratings-hexipi",
  "version": "0.2.3",
  "main": "./lib/Ratings.js",
  "types": "./lib/Ratings.d.ts",
  "dependencies": {
    "bootstrap": "^4.6.0",
    "jquery": "^3.6.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "reactstrap": "^8.9.0",
    "color-functions-hexipi": "^0.1.7",
    "query-string": "^6.13.7"
  },
  "peerDependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "font-awesome": "^4.7.0"
  },
  "devDependencies": {
    "@types/node": "^14.14.36",
    "@types/prop-types": "^15.7.3",
    "@types/react-dom": "^17.0.3",
    "@types/reactstrap": "^8.7.2",
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "babel-preset-env": "^1.7.0",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    "css-loader": "^3.6.0",
    "file-loader": "^6.2.0",
    "path": "^0.12.7",
    "prop-types": "^15.7.2",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "source-map-loader": "^1.1.3",
    "style-loader": "^1.2.1",
    "svg-url-loader": "^6.0.0",
    "ts-loader": "^8.0.18",
    "typescript": "^4.2.3",
    "webpack": "^4.43.0",
    "webpack-cli": "^3.3.12"
  },
  "scripts": {
    "prebuild": "tsc",
    "build": "webpack"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "files": [
    "lib/**/*"
  ],
  "description": "This is a React.JS ratings module.",
  "author": "Jose A. Alvarado",
  "keywords": ["ratings", "reviews", "react", "react.js", "ui", "hexipi"],
  "license": "MIT",
  "homepage": "https://github.com/HexiPi/ratings"
}
