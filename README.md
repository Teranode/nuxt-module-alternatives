# nuxt-module-alternatives
Alternative modules to use while waiting for Nuxt 3 Compatibility

**Current Modules**
- Nuxt Axios Module: [Nuxt Community Repository](https://github.com/nuxt-community/axios-module)
- Nuxt Proxy Module: [Nuxt Community Repository](https://github.com/nuxt-community/proxy-module)
- Nuxt Auth Module: [Nuxt Community Repository](https://github.com/nuxt-community/auth-module)
- Nuxt Google Fonts Module: [Nuxt Community Repository](https://github.com/nuxt-community/google-fonts-module)
- VueJS/Nuxt Pinia: [VueJS/Nuxt Pinia Repository](https://github.com/vuejs/pinia)
- Nuxt Vuex: ?

**Instructions**
- Add any of these modules to your `modules` directory of your nuxt 3 application. 
- Then in your `package.json` add them as a local module.
- Finally run `npm install` to have them symlinked.
- You can then add them to the `modules` or `buildModules` like you would in Nuxt with the same named aliases.

Example `package.json`:
<details>
<summary>package.json</summary>

```json
{
    "private": true,
    "scripts": {
        "dev": "nuxi dev",
        "build": "nuxi build",
        "start": "node .output/server/index.mjs"
    },
    "devDependencies": {
        "axios": "^0.25.0",
        "axios-retry": "^3.2.4",
        "google-fonts-helper": "^2.0.1",
        "http-proxy-middleware": "^2.0.2",
        "nuxt3": "latest"
    },
    "dependencies": {
        "@nuxtjs/axios": "file:modules/@nuxtjs/axios",
        "@nuxtjs/auth": "file:modules/@nuxtjs/auth",
        "@nuxtjs/google-fonts": "file:modules/@nuxtjs/google-fonts",
        "@nuxtjs/pinia": "file:modules/@nuxtjs/pinia",
        "@nuxtjs/proxy": "file:modules/@nuxtjs/proxy",
        "@nuxtjs/vuex": "file:modules/@nuxtjs/vuex" // Depricated
    }
}
```
or 

```json
{
    "private": true,
    "scripts": {
        "dev": "nuxi dev",
        "build": "nuxi build",
        "start": "node .output/server/index.mjs"
    },
    "devDependencies": {
        "axios": "^0.25.0",
        "axios-retry": "^3.2.4",
        "google-fonts-helper": "^2.0.1",
        "http-proxy-middleware": "^2.0.2",
        "nuxt3": "latest"
    },
    "dependencies": {
        "@nuxtjs/axios": "https://gitpkg.now.sh/Teranode/nuxt-module-alternatives/@nuxtjs/axios?master",
        "@nuxtjs/auth": "https://gitpkg.now.sh/Teranode/nuxt-module-alternatives/@nuxtjs/auth?master",
        "@nuxtjs/google-fonts": "https://gitpkg.now.sh/Teranode/nuxt-module-alternatives/@nuxtjs/google-fonts?master",
        "@nuxtjs/pinia": "https://gitpkg.now.sh/Teranode/nuxt-module-alternatives/@nuxtjs/pinia?master",
        "@nuxtjs/proxy": "https://gitpkg.now.sh/Teranode/nuxt-module-alternatives/@nuxtjs/proxy?master",
        "@nuxtjs/vuex": "https://gitpkg.now.sh/Teranode/nuxt-module-alternatives/@nuxtjs/vuex?master" // Depricated
    }
}
```
</details>

Each module has a readme file with a list of packages that will need to be installed as a dependency.
