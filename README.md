# Rails hooks

[![Version][version-badge]][package]

## Installation

with npm

```sh
npm install rails-hooks
```

with yarn

```sh
yarn add rails-hooks
```

## API

- [useCable](#usecable)

### `useCable`

Requires for `CableProvider` to be set somewhere above the component where `useCable` will be used.

```tsx
import React from 'react'
import { CableProvider } from 'rails-hooks'
import { createConsumer } = '@rails/actioncable'

const App = () => {
  const consumer = createConsumer('optional-url.com')

  return(
    <CableProvider consumer={consumer}>
      ...
    </CableProvider>
  )
}
```

Then `useCable` can be used like this:

```tsx
import { useCable } from 'rails-hooks'

const [messages, setMessages] = useState([])

const chatChannel = useCable(
  { channel: 'ChatChannel', room: 'Best room' },
  {
    received(data) {
      setMessages(prevMessages => [...prevMessages, data])
    },
  }
)

chatChannel.send({ sent_by: 'Paul', body: 'This is a cool chat app.' })
```

[version-badge]: https://img.shields.io/npm/v/rails-hooks.svg?style=flat-square
[package]: https://www.npmjs.com/package/rails-hooks
