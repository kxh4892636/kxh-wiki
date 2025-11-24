// TODO

# vscode

## 插件

- ssh 相关
- tailwindcss
- bookmarks
- code runnder
- code spell check
- es7——react
- eslint
- git history
- intellicode
- liver server
- markdown all in one
- paste image
- prettier
- remote 相关
- vim
- vscode-icons

## 配置文件

```json
{
  // UI 配置
  "workbench.colorTheme": "Default Light+",
  "editor.fontFamily": "'Ubuntu Mono', Consolas, 'Courier New', monospace",
  "workbench.editor.wrapTabs": true,
  "workbench.iconTheme": "vscode-icons",
  "workbench.editor.splitInGroupLayout": "vertical",
  "editor.rulers": [80, 120],

  // 终端设置
  "terminal.integrated.defaultProfile.windows": "Command Prompt",
  "code-runner.runInTerminal": true,

  // 操作配置
  "editor.linkedEditing": true,
  "editor.lineNumbers": "on",
  "explorer.copyRelativePathSeparator": "/",

  // 格式化配置
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[python]": {
    "editor.defaultFormatter": "charliermarsh.ruff"
  },

  // suggest/snippets 配置
  "emmet.showExpandedAbbreviation": "never",
  "editor.suggestSelection": "recentlyUsedByPrefix",
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "editor.quickSuggestions": {
    "strings": "on"
  },

  // python 配置
  "python.languageServer": "Pylance",
  "python.analysis.typeCheckingMode": "basic",

  // markdown 配置
  "markdown.updateLinksOnFileMove.enabled": "always",
  "[markdown]": {
    "editor.quickSuggestions": {
      "comments": "on",
      "strings": "on",
      "other": "on"
    }
  },

  // js/ts 配置
  "javascript.updateImportsOnFileMove.enabled": "always",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "javascript.suggest.paths": true,
  "typescript.suggest.paths": true,

  // JSON 配置
  "json.schemaDownload.enable": false,

  // 文本
  "files.eol": "\n",

  // 插件配置
  // paste image 配置
  "pasteImage.path": "${currentFileDir}/images",
  "security.workspace.trust.untrustedFiles": "open",
  "notebook.lineNumbers": "on",
  // run coder
  "code-runner.executorMap": {
    "javascript": "node --experimental-specifier-resolution=node",
    "typescript": "tsx"
  },
  // git 配置
  "gitHistory.includeRemoteBranches": true,
  "git.openRepositoryInParentFolders": "always",
  // 远程
  "explorer.confirmDelete": false,
  "remote.SSH.remotePlatform": {
    "aliyun": "linux"
  },
  // vim 配置
  "vim.autoSwitchInputMethod.enable": true,
  "extensions.experimental.affinity": {
    "vscodevim.vim": 1
  },
  "vim.useCtrlKeys": false,
  "vim.handleKeys": {
    "<C-c>": false
  },

  // 通知相关
  "extensions.ignoreRecommendations": true,
  "diffEditor.codeLens": true,
  "[xml]": {
    "editor.defaultFormatter": "redhat.vscode-xml"
  },
  "editor.unicodeHighlight.ambiguousCharacters": false
}
```
