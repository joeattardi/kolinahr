import React from 'react';

import Tooltip from './Tooltip';

export default function DocumentUserList(props) {
  if (props.users.length > 1) {
    return (
      <div className="banner banner-info">
        <div id="document-user-list">
          {props.users.length} users editing this document
          {props.users.map(user => (
            <Tooltip text={user.name}>
              <img key={user._id} alt={user.name} src={user.picture} width="30" />
            </Tooltip>
            )
          )}
        </div>
      </div>
    );
  }

  return <div />;
}

DocumentUserList.propTypes = {
  users: React.PropTypes.array.isRequired
};
