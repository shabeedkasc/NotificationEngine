# 🚀 Getting started 

Implementations to keep in mind.
### `User Action Logging`

To log user action, do the following:

1. In a modules' file, import the user action logging service function.

```javascript
const userActionService = require("../userAction/userActionService");
```

2. In the method where a new action is to be logged; define the parameters.

```javascript
 let actionparam={req:req,Content:'PARAMETERS, PASSED',Route:'/some/route',Action:'A new user action has been logged'}
```

3. Call the action logging function.


```javascript
userActionService.AddUserAction(actionparam);
```

### `Error Logging`

To ensure errors are logged, do the following:

1. In a modules' controller file, import the error logging function.

```javascript
const logError = require("../../utils/logger/errorFunction");
```

2. In the catch block, call the error logging function.

```javascript
try{
    //YOUR CODE HERE
}
catch(error){
return logError(error.message, error.stack,"filename.js", "/some/route");
}
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-build)

```
npm run build
# or
yarn build
```

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project. Find the one that suits you on the [deployment section of the documentation](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/deployment.html).

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://docs.strapi.io) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
