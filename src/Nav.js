import React from 'react'
import useCollection from './useCollection'
import { firebase } from './firebase'
import { Link } from '@reach/router'

function Nav({ user }) {
  const channels = useCollection('channels')
  // const messages = useCollection('channels/general/messages')

  return (
    <div className="Nav">
      <div className="User">
        <img className="UserImage" src={user.photoUrl} alt="whatever" />
        <div>
          <div>{user.displayName}</div>
          <div>
            <button
              onClick={() => {
                firebase.auth().signOut()
              }}
              className="text-button"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
      <nav className="ChannelNav">
        {channels.map((channel, index) => (
          <Link key={channel.id} to={`/channel/${channel.id}`}>
            # {channel.id}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Nav
