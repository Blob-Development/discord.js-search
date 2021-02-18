# discord.js-search
Find Discord assets such as users or channels in an easier way—quick and easy setup.

## Install
npm:
```npm install discord.js-search```

<br>

yarn:
```yarn add discord.js-search```

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
