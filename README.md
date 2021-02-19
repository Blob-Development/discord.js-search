# discord.js-search
Find Discord assets such as users or channels in an easier way—quick and easy setup.

## Install
[npm](https://www.npmjs.com/):
```bash
npm install discord.js-search
```

<br>

[yarn](https://yarnpkg.com/):
```bash
yarn add discord.js-search
```

## Requirements:
[`Node.js`](http://nodejs.org/) — **v14** or latest.
<br><br>
[`Discord.js`](https://discord.js.org/) — **v12.3.1** or latest.

## Example
Synchronous:
```js
const search = require("discord.js-search");

search.searchMember(message, 'ray#1337').then(x => {
  console.log(x); // Return: https://discord.js.org/#/docs/main/stable/class/GuildMember
});
```

<br>

Asynchronous:
```js
const search = require("discord.js-search");

let findMem = await search.searchMember(message, 'ray#1337');
return message.channel.send(findMem.user.tag); // Return: https://discord.js.org/#/docs/main/stable/class/GuildMember
```

## Reference
> - **query** can be string (name, tag) or number (ID)
> - **fetchUnused** - Force API to fetch all members. (optional)
> - **production** - Skip package validation such as Discord.js for pre-production purposes. (optional)

- **searchEmoji([message](https://discord.js.org/#/docs/main/stable/class/Message), query:String|Number, production:Boolean = false)**

- **searchRole([message](https://discord.js.org/#/docs/main/stable/class/Message), query:String|Number, production:Boolean = false)**

- **searchChannel([message](https://discord.js.org/#/docs/main/stable/class/Message), query:String|Number, production:Boolean = false)**

- **searchMember([message](https://discord.js.org/#/docs/main/stable/class/Message), query:String|Number, fetchUnused:Boolean = false, production:Boolean = false)**

## Changelog
See [CHANGELOG.md](CHANGELOG.md).

## Links
- [Headquarters (Discord Server)](https://blob-project.com/discord)
- [GitHub](https://github.com/Blob-Development/discord.js-search)
- [NPM](https://npmjs.com/package/discord.js-search)

## Disclaimer
This project is not affiliated/associated/partnered with Discord or even Discord.js itself. <br>
If you have a problem with the package, create [issue template](https://github.com/Blob-Development/discord.js-search/issues) instead.

## License
[Apache License, version 2.0](https://www.apache.org/licenses/LICENSE-2.0)
