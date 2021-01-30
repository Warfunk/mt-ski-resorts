import { useState } from 'react';

const Fields = ({ route, loadUser, onRouteChange }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onSubmitSignIn = () => {
    fetch('https://calm-crag-40780.herokuapp.com/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          loadUser(user);
          onRouteChange('home');
        }
      });
  };

  const onSubmitRegister = () => {
    fetch('https://calm-crag-40780.herokuapp.com/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        name: name,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          loadUser(user);
          onRouteChange('home');
        } else {
          alert('Please fill out form completly');
        }
      });
  };

  return (
    <article className="br3 ba shadow-5 b--black-10 mv4 mw5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            {route === 'register' ? (
              // Register header and name input
              <div>
                <legend className="f2 fw6 ph0 mh0 center">Register</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="name">
                    Name
                  </label>
                  <input
                    onChange={onNameChange}
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="name"
                    name="name"
                    id="name"
                  />
                </div>
              </div>
            ) : (
              // Sign In Header
              <legend className="f2 fw6 ph0 mh0 center">Sign In</legend>
            )}
            {/* Same for both sign in and register  */}
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Username
              </label>
              <input
                onChange={onUsernameChange}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="Username"
                id="Username"
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                onChange={onPasswordChange}
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
              />
            </div>
          </fieldset>
          {route === 'register' ? ( // Submit Register
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
                onClick={onSubmitRegister}
              />
            </div>
          ) : (
            // Submit sign in and other Sign In Page Options
            <div>
              <div className="">
                <input
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Sign in"
                  onClick={onSubmitSignIn}
                />
              </div>
              <div className="lh-copy mt3">
                <p
                  onClick={() => onRouteChange('register')}
                  className="f6 link dim black db pointer"
                >
                  Register
                </p>
              </div>
              <div className="lh-copy mt3">
                <p
                  onClick={() => onRouteChange('nonuser')}
                  className="f6 link dim black db pointer"
                >
                  Skip
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </article>
  );
};

export default Fields;
