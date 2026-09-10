# SaveXTube-mobile

独立的 Expo 手机端项目，包含下载、任务、设置三个页面。项目从源码设计上不包含授权界面、授权管理器或授权检查。

## 开发

```bash
npm install
npx expo start
```

首次启动默认连接 `https://save.tmac.top:13483`，下载页会调用服务端的 `POST /api/download` 接口。服务端地址可在“设置”页修改；项目不包含授权界面、授权管理器或授权检查。

## 构建 iOS

在 macOS 上执行 `npx expo prebuild -p ios` 后使用 Xcode 构建和签名；也可以通过 GitHub Actions 配置 Expo/EAS 生成 IPA。Windows 环境只能完成源码检查，不能直接签名 iOS IPA。
