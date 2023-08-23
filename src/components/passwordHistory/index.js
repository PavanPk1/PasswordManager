import './index.css'

const PasswordHistory = props => {
  //    console.log(props)
  const {newList, deleteMethod, showPasswords} = props
  const {id, website, username, password, profileColor} = newList
  //    console.log(showPasswords)
  return (
    <li className="password-container">
      <p className="profile" style={{backgroundColor: profileColor}}>
        {website.slice(0, 1).toUpperCase()}
      </p>
      <div className="details">
        <p className="website-name">{website}</p>
        <p className="user-name">{username}</p>
        {showPasswords ? (
          <p className="site-password">{password}</p>
        ) : (
          <p className="site-password">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="stars"
            />
          </p>
        )}
      </div>
      <button
        type="button"
        data-testid="delete"
        className="delete-btn"
        onClick={() => deleteMethod(id)}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordHistory
