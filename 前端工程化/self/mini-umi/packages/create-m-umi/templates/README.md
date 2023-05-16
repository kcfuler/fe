### 微内核架构：
使用插件扩展你可以想象到的一切

> ✅ Monorepo 最佳实践 + Turbo 远端构建缓存
## 体验 mini-umi + Vue3.2 + Vite预设
```
npx create-mumi 项目名
npm install
npm run dev
npm run ssr // 服务端渲染模式
```
## 实现 Service Core 架构的最简模型
😚已完成：

✅ 实现内置 presets plugin 功能

✅  实现 mini-umi 的 command 系统

✅ 实现编译时 Hook

✅ feat: 读取用户 Local Plugin

✅ 完善插件API

✅ 实现 create-mumi 脚手架

✅ 实现 userConfig 以及 modify 全流程

✅ 实现 Preset-Vue3.2 + Vite + dev build preview

✅ 实现约定式路由 支持动态路由 Vite 支持 Vue3.2 Hmr

✅ 支持对于 dev 约定式路由 的热更新

✅ 支持以 LocalPlugin 的形式 ModifyBundleConfig

✅ 支持用户配置文件自定义路由 和 更改约定式路由所在目录

✅ 可通过 npm run ssr 开启服务端渲染模式

✅ CSR SSR 支持用户自定义Layout

🤔TODO：
- [ ] 实现自定义 Layout 以及 addLayout api
...

🤔More:
- [ ] 实现一套 preset-react
- [ ] 实现一套 preset-qiankun
- [ ] 实现 father
- [ ] 实现 dumi

