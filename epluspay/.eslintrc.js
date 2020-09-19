module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "extends": "standard",
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "import/no-duplicates": [0],
    "no-unused-vars":'off'   //去掉未使用声明报错
  }
};
