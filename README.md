> 🏗 This project is under development!

# Node.js API-wrapper for Public Transport in Hamburg

## Installation

```bash
npm install hvv
```

## Usage

```js
import { HVVClient } from 'hvv';

const hvv = new HVVClient({
  accept: 'application/json',
  contentType: 'application/json',
  host: '/',
  key: 'secret',
  platform: 'web',
  user: 'user'
});

hvv
  .getRoute({
    start: '...',
    dest: '...'
  })
  .then(result => console.log(result));
```

## License

[MIT](LICENSE) © Lion Ralfs
