import nextConfig from "eslint-config-next";
import jsxA11y from "eslint-plugin-jsx-a11y";

const eslintConfig = [
  ...nextConfig,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: jsxA11y.configs.recommended.rules,
  },
  { ignores: [".next/**", "out/**", "node_modules/**", "public/**"] },
];

export default eslintConfig;
