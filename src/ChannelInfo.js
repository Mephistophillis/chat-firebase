import React from 'react'
import useDocWithCache from './useDocWithCache'

function ChannelInfo({ channelId }) {
  const channel = useDocWithCache(`channels/${channelId}`)
  return (
    <div className="ChannelInfo">
      <div className="Topic">
        Topic:{' '}
        <input className="TopicInput" defaultValue={channel && channel.topic} />
      </div>
      <div className="ChannelName">#{channelId}</div>
    </div>
  )
}

export default ChannelInfo
