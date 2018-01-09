# HVV Node.js Wrapper

## Installation

```bash
npm install hvv
```

## Usage

```js
import { HVVClient } from 'hvv';

const hvv = new HVVClient({
  key: '<YOUR-API-KEY>'
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
