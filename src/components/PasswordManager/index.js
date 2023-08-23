import './index.css'
import {Component} from 'react'
import {v4} from 'uuid'

import PasswordHistory from '../passwordHistory'

const colors = [
  '#f59e0b',
  '#10b981',
  '#f97316',
  '#14b8a6',
  '#b91c1c',
  '#0ea5e9',
  '#0b69ff',
]

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordsList: [],
    showPasswords: false,
    searchInput: '',
  }

  toggleShowPasswords = () => {
    this.setState(prevState => ({
      showPasswords: !prevState.showPasswords,
    }))
  }

  deleteMethod = uniqueId => {
    const {passwordsList} = this.state

    const filteredPasswords = passwordsList.filter(
      savedPass => savedPass.id !== uniqueId,
    )
    this.setState({
      passwordsList: filteredPasswords,
    })
  }

  onChangeInSearch = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmit = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const randomColorIndex = Math.floor(Math.random() * colors.length)
    const initialBackgroundColor = colors[randomColorIndex]

    const newPassword = {
      id: v4(),
      website,
      username,
      password,
      profileColor: initialBackgroundColor,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      website: '',
      username: '',
      password: '',
    }))
  }

  render() {
    const {
      website,
      username,
      password,
      passwordsList,
      showPasswords,
      searchInput,
    } = this.state
    const filteredSearchResults = passwordsList.filter(savedPass =>
      savedPass.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="app-logo"
          alt="app logo"
        />
        <div className="sections">
          <form className="form" onSubmit={this.onSubmit}>
            <h1 className="form-title">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-logos"
              />
              <input
                className="input-text"
                type="text"
                placeholder="Enter Website"
                value={website}
                onChange={this.onChangeWebsite}
                required
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                alt="username"
                className="input-logos"
              />
              <input
                className="input-text"
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={this.onChangeUsername}
                required
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-logos"
              />
              <input
                className="input-text"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={this.onChangePassword}
                required
              />
            </div>
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="manager-pic"
          />
        </div>
        <div className="section-2">
          <div className="navbar">
            <div className="nav-1">
              <h1 className="myPasswords">Your Passwords</h1>
              <p className="count">{filteredSearchResults.length}</p>
            </div>

            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-logo"
              />
              <input
                type="search"
                placeholder="Search"
                className="search-text"
                value={searchInput}
                onChange={this.onChangeInSearch}
              />
            </div>
          </div>

          <hr className="hr-line" />
          <div className="show-pass-container">
            <input
              type="checkbox"
              className="checkbox"
              id="checkboxId"
              onChange={this.toggleShowPasswords}
            />
            <label className="showPassword" htmlFor="checkboxId">
              Show Passwords
            </label>
          </div>

          {filteredSearchResults.length > 0 ? (
            <ul className="saved-passwords">
              {filteredSearchResults.map(newList => (
                <PasswordHistory
                  newList={newList}
                  key={newList.id}
                  deleteMethod={this.deleteMethod}
                  showPasswords={showPasswords}
                />
              ))}
            </ul>
          ) : (
            <>
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
                alt="no passwords"
                className="no-password"
              />
              <p className="text">No Passwords</p>
            </>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
