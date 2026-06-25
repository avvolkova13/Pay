import nextVitals from "eslint-config-next/core-web-vitals";

const ignores = [
  {
    ignores: [".next/**", "out/**", "node_modules/**"]
  }
];

const eslintConfig = [...nextVitals, ...ignores];

export default eslintConfig;
