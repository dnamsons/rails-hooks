import { Subscription, ChannelName, CreateMixin } from '@rails/actioncable'
import { useContext, useEffect, useRef } from 'react'
import { ActionCableContext } from './CableProvider'
import invariant from 'tiny-invariant'

/**
 * __useCable__
 *
 * A hook that wraps the ActionCable subscription logic.
 *
 * This hook requires `CableProvider` to be defined somewhere above the invocation in the DOM tree.
 *
 * @param channel the name of the channel. It can either be passed as a string, or it can be passed as an object with additional parameters
 * @param mixin an object that contains the callbacks
 *
 * @return {Subscription}
 *
 * @example
 *
 * useCable('WebNotificationsClient', {
 *   received(data) {
 *     new Notification(data["title"], body: data["body"])
 *   }
 * })
 *
 * @example
 * const [messages, setMessages] = useState([])
 *
 * const chatChannel = useCable(
 *   { channel: 'ChatChannel', room: 'Best room' },
 *   {
 *     received(data) {
 *       setMessages((prevMessages) => [...prevMessages, data])
 *     }
 *   }
 * )
 *
 * chatChannel.send({ sent_by: 'Paul', body: 'This is a cool chat app.' })
 */
export const useCable = (channel: ChannelName, mixin?: CreateMixin) => {
  const { consumer } = useContext(ActionCableContext)
  const subscription = useRef<Subscription>()

  invariant(
    !!consumer,
    'CableProvider was not passed a consumer instance. Make sure you pass the ActionCable consumer via the `consumer` prop'
  )

  useEffect(() => {
    subscription.current = consumer.subscriptions.create(channel, mixin)

    return () => subscription.current?.unsubscribe()
  })

  return subscription
}
