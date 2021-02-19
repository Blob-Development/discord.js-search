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
> - **fetchUnused** and **production** are optional.
> - **query** can be string (name, tag) or number (ID)

- **searchEmoji([message](https://discord.js.org/#/docs/main/stable/class/Message), query:String|Number, production:Boolean = false)**

- **searchRole([message](https://discord.js.org/#/docs/main/stable/class/Message), query:String|Number, production:Boolean = false)**

- **searchChannel([message](https://discord.js.org/#/docs/main/stable/class/Message), query:String|Number, production:Boolean = false)**

- **searchMember([message](https://discord.js.org/#/docs/main/stable/class/Message), query:String|Number, fetchUnused:Boolean = false, production:Boolean = false)**
