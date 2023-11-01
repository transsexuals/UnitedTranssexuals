import * as User from './userModal';

/**
 * @function login
 * @param req object
 * @param res object
 * @description handles the login process.
 */
export const login = (req, res) => {
  if (!req.session) return res.send({
    status: 'error',
    description: 'session null'
  });
  if (req.session.user) {
    res.cookie('session', JSON.stringify({
      user: req.session.user
    }));
    return res.redirect('/');
  }

  const user = {
    email: req.body.email,
    password: req.body.password
  };

  User.authenticate(user).then((authenticate) => {
    if (authenticate.error) {
      return res.send({
        error: 'login',
        description: 'incorrect details'
      });
    }
    // details correct - login user.
    req.session.user = {
      id: authenticate.id,
      uuid: authenticate.uuid,
      email: authenticate.email
    };
    res.cookie('session', JSON.stringify({
      user: req.session.user,
    }));
    return res.send({
      status: 'success',
      description: 'login'
    });
  });
  return res.redirect('/');
};

/**
 * @function register
 * @param req object
 * @param res object
 * @description handles the register process.
 */
export const register = (req, res) => {
  if (req.session.user) {
    res.cookie('session', JSON.stringify({
      user: req.session.user
    }));
    return res.redirect('/');
  }

  const user = {
    email: req.body.email,
    password: req.body.password,
    captcha: req.body.captcha
  };

  User.register(user).then((registration) => {
    if (registration.error) {
      return res.send(registration);
    }
    User.authenticate(user).then((authenticate) => {
      if (authenticate.error) {
        return res.send({
          error: 'register',
          description: authenticate.description
        });
      }
      if (user && authenticate.uuid) {
        req.session.user = {
          uuid: authenticate.uuid,
          email: authenticate.email
        };
        res.cookie('session', JSON.stringify({
          user: req.session.user
        }));
        return res.send({
          status: 'success',
          description: 'register'
        });
      }
      return res.redirect('/');
    }).catch((error) => {
      console.log('error:');
      console.log(error);
    });
    return res.redirect('/');
  }).catch((error) => {
    console.log('error:');
    console.log(error);
  });
  return res.redirect('/');
};

/**
 * @function logout
 * @param req object
 * @param res object
 * @param next object
 * @description handles the logout process.
 */
export const logout = (req, res, next) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie('psychedelices');
      return res.redirect('/');
    });
  }
  res.clearCookie('psychedelices');
  return res.redirect('/');
};

/**
 * @function socketHandler
 * @param socket object
 * @description handles the register process.
 */
export const socketHandler = (socket) => {
  socket.on('public', (data) => {
    console.log('socket.on public..');

    if (data.api) {
      if (data.api === 'user') {
        console.log('api: user');
        if (socket.handshake.session.user !== undefined) {
          User.get(socket.handshake.session.user.uuid, (err, user) => {
            console.log('user is:');
            console.log(user);
            if (user) {
              socket.emit('public', {
                api: 'user',
                user: user,
              });
            } else { // Error or user hasn't created market.
              socket.emit('public', {
                api: 'user',
                user: null,
              });
            }
          });
        }
      } else if (data.api === 'update') {
        console.log('api: update');
        if (socket.handshake.session.user !== undefined) {
          const user = {};
          // Verify and cleanup data.
          if (data.details !== undefined) {
            user.uuid = socket.handshake.session.user.uuid;
            user.email = socket.handshake.session.user.email;
            user.public = data.details.public !== undefined
              ? data.details.public
              : {
                markerID: 'u001',
                message: ''
              };
          }
          User.update(socket.handshake.session.user.uuid,
            data.details !== undefined ? user : null,
            (err, dbUser) => {
              if (dbUser) {
                // User details exists - update
                console.log('user update - success');
              } else {
                console.log('user update - failed');
              }
            });
        }
      } else if (data.api === 'location') {
        console.log('api: location');
        if (socket.handshake.session.user !== undefined) {
          const user = {};
          // Verify and cleanup data.
          console.log(data);
          if (data.details !== undefined) {
            user.uuid = socket.handshake.session.user.uuid;
            if (data.details.loc !== undefined
              && data.details.loc.coordinates !== undefined
              && data.details.loc.coordinates.length > 0
            ) {
              user.loc = {
                coordinates: [...data.details.loc.coordinates]
              };
            }
          }
          console.log(user);
          User.update(socket.handshake.session.user.uuid,
            data.details !== undefined ? user : null,
            (err, dbUser) => {
              if (dbUser) {
                // User details exists - update
                console.log('user update - success');
              } else {
                console.log('user update - failed');
              }
            }
          );
        }
      }
    }
  });
};
