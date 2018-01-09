# Node.js API-wrapper for Public Transport in Hamburg

## Installation

```bash
npm install hvv
```

## Usage

```js
import { HVVClient } from 'hvv';

const client = new HVVClient({
  accept: 'application/json',
  contentType: 'application/json',
  host: '/',
  key: 'secret',
  platform: 'web',
  user: 'user'
});

hvv
  .getRoute({
    from: '...',
    to: '...'
  })
  .then(result => console.log(result));
```

## License

[MIT](LICENSE) © Lion Ralfs
