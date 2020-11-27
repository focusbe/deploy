# deploy-action
build vue/react/gulp and deploy your project over ssh|rsync|ftp to you server

## you have two choice to deply your project

# Option1
## step1
  get a deploy-token by https://tools.focusbe.com/deploy-token
  
## step2
```
uses: focusbe/deploy-action@v1
with:
  deploy-token: ${{DEPLOY_TOKEN}}
```
  
# Option2

## Inputs

### `deploy-type`

**requied** you can use ssh|rsync|ftp. Default `"rsync"`.

### `project-name`
**optional** you can use front-static|front-build|backend-php|backend-node。 Default github reposity name.

### `project-type`
**requied** you can use front-static|front-build|backend-php|backend-node。 Default `"front-build"`.
### `ip`
**requied** you server ip.

### `username`
**requied** you server username.

### `password`
**optional** you server password.

### `remote-path`
**optional** the path of you project on your server.

### `port`
**optional** when you deploy-type is `"ssh"`|`"ftp"`,you need input port.Default `22`.

### Example
```
uses: focusbe/deploy@v1
with:
  deploy-type: ftp,
  project-type: front-static,
  ip: **.**.**.**,
  port: 21,
  username: ${{Username}},
  password: ${{Password}},
  remote-path: /var/www/html
```

**Do not input password or token in .yml file,you can save it in github->project->setting->secrets,and use it by ${{secrets.SomeThing}}**



