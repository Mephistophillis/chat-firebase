import React from 'react'
import useCollection from './useCollection'
import useDocWithCache from './useDocWithCache'
import formatDate from 'date-fns/format'
import { isSameDay } from 'date-fns/is_same_day'

function Messages({ channelId }) {
  const messages = useCollection(`channels/${channelId}/messages`, 'createdAt')

  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every massage!</div>
      {messages.map((message, index) => {
        const previus = message[index - 1]
        const showDay = shouldShowDay(previus, message)
        const showAvatar = shouldShowAvatar(previus, message)

        return showAvatar ? (
          <FirstMessageFromUser
            key={message.id}
            message={message}
            showDay={showDay}
          />
        ) : (
          <div className="Message no-avatar">
            <div className="MessageContent">{message.text}</div>
          </div>
        )
      })}
    </div>
  )
}

function FirstMessageFromUser({ message, showDay }) {
  const author = useDocWithCache(message.user.path)
  return (
    <div key={message.id}>
      {showDay && (
        <div className="Day">
          <div className="DayLine" />
          <div className="DayText">
            {new Date(message.createdAt.seconds * 1000).toLocaleDateString()}
          </div>
          <div className="DayLine" />
        </div>
      )}
      <div className="Message with-avatar">
        <div
          className="Avatar"
          style={{
            backgroundImage: author ? `url("${author.photoUrl}")` : ''
          }}
        />
        <div className="Autor">
          <div>
            <span className="UserName">{author && author.displayName}</span>{' '}
            <span className="TimeStamp">
              {formatDate(message.createdAt.seconds * 1000, 'HH:mm')}
            </span>
          </div>
          <div className="MessageContent">{message.text}</div>
        </div>
      </div>
    </div>
  )
}

function shouldShowDay(previus, message) {
  const isFirst = !previus
  if (isFirst) {
    return true
  }

  const isNewDay = !isSameDay(
    previus.createdAt.seconds * 1000,
    message.createdAt.seconds * 1000
  )

  return isNewDay
}

function shouldShowAvatar(previus, message) {
  const isFirst = !previus
  if (isFirst) {
    return true
  }
  const differentUser = message.user.id !== previus.user.id
  if (differentUser) {
    return true
  }
  const hasBeenAWhile =
    message.createdAt.seconds - previus.createdAt.seconds > 180

  return hasBeenAWhile
}

export default Messages
