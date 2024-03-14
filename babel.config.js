module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  // plugins: [
  //   "@vue/babel-plugin-jsx",
  //   {
  //     mergeProps: false, // 关掉vue自带的合并prop功能，所有的prop传递需要自己明确后进行操作（合并、删除）
  //   },
  // ],
  plugins: [
    [
      "@vue/babel-plugin-jsx",
      {
        mergeProps: false, // 关掉vue自带的合并prop功能，所有的prop传递需要自己明确后进行操作（合并、删除）
      },
    ],
  ],
};
