declare module ActionCable {
  interface Subscription {
    unsubscribe(): void
    perform(action: string, data: object): void
    send(data: any): boolean
  }

  interface ChannelNameWithParams {
    channel: string
    [key: string]: any
  }

  type ChannelName = string | ChannelNameWithParams

  interface CreateMixin {
    connected?(): void
    disconnected?(): void
    received?(obj: any): void
    [key: string]: any
  }

  interface Subscriptions {
    create(channel: ChannelName, obj?: CreateMixin): Subscription
  }

  interface Cable {
    subscriptions: Subscriptions
    send(data: any): void
    connect(): void
    disconnect(): void
    ensureActiveConnection(): void
  }

  function createConsumer(): Cable
  function createConsumer(url: string): Cable

  function getConfig(name: string): string | void
}

declare module '@rails/actioncable' {
  export = ActionCable
}
