import React from 'react';

class MessageItem extends React.Component {
  constructor(props) {
    super(props);

    const { message } = this.props;
    this.state = {
      editMode: false,
      editText: message.text,
    };
  }

  onToggleEditMode = () => {
    const { message } = this.props;
    this.setState((state) => ({
      editMode: !state.editMode,
      editText: message.text,
    }));
  };

  onChangeEditText = (event) => {
    this.setState({ editText: event.target.value });
  };

  onSaveEditText = () => {
    const { message, onEditMessage } = this.props;
    const { editText } = this.state;
    onEditMessage(message, editText);

    this.setState({ editMode: false });
  };

  render() {
    const {
      authUser,
      message,
      onRemoveMessage,
    } = this.props;
    const { editMode, editText } = this.state;

    return (
      <li>
        {editMode ? (
          <input
            type="text"
            value={editText}
            onChange={this.onChangeEditText}
          />
        ) : (
          <span>
            <strong>{message.userId}</strong> {message.text}
          </span>
        )}

        {authUser.uid === message.userId && (
          <span>
            {editMode ? (
              <span>
                <button
                  type="button"
                  onClick={this.onSaveEditText}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={this.onToggleEditMode}
                >
                  Reset
                </button>
              </span>
            ) : (
              <button
                type="button"
                onClick={this.onToggleEditMode}
              >
                Edit
              </button>
            )}
            {!editMode && (
              <button
                type="button"
                onClick={() => onRemoveMessage(message.uid)}
              >
                Delete
              </button>
            )}
          </span>
        )}
      </li>
    );
  }
}

export default MessageItem;
