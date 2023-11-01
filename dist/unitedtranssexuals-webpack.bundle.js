/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cookie-parser */ "cookie-parser");
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _routes_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routes/index */ "./routes/index.js");




// import * as postgres from './libs/db/postgres';

/**
 * Express.js server.
 */
var app = express__WEBPACK_IMPORTED_MODULE_0___default()();
// note adjust __dirname '../public' depending on webpack build
app.use(express__WEBPACK_IMPORTED_MODULE_0___default()["static"](path__WEBPACK_IMPORTED_MODULE_1___default().join(__dirname, '/public'), {
  index: 'index.html',
  extensions: ['html']
}));
console.log(path__WEBPACK_IMPORTED_MODULE_1___default().join(__dirname, '../public'));
app.use(express__WEBPACK_IMPORTED_MODULE_0___default().json());
app.use(express__WEBPACK_IMPORTED_MODULE_0___default().urlencoded({
  extended: false
}));
app.use(cookie_parser__WEBPACK_IMPORTED_MODULE_2___default()());

/**
 * Routes - post, get, put, delete...
 */
app.use('/', _routes_index__WEBPACK_IMPORTED_MODULE_3__["default"]);
// Handle 404 errors
app.use(function (req, res) {
  res.status(404).sendFile(path__WEBPACK_IMPORTED_MODULE_1___default().join(__dirname, '/public', '/error.html'));
});

/**
 * Server Shutdown handler
 */
process.on('SIGINT', function () {
  // const shutdown = () => server.close(async () => {
  //     await postgres.shutdown();
  //     await process.exit(0);
  // });
  // shutdown().catch((error) => {
  //     console.log('shutdown error: ', error);
  // });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);

/***/ }),

/***/ "./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  app: {
    name: 'unitedtranssexuals.org',
    version: '1.0.0',
    info: 'United Transsexuals'
  },
  ip: {
    server: '10.134.0.2'
  },
  port: {
    server: 4000,
    socket: 6660
  },
  security: {
    cookie: {
      secret: '66iVzEwvXu3AHwxAjAw2UD6CYyC29vGgbGK86mcCJCXvxWNj3C',
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week cookie age.
    }
  },

  database: {
    postgres: {
      use: 'development',
      // set to 'deployment' or 'development' to switch.
      deployment: 'postgres://jezebel:password123@localhost/transsdb',
      development: 'postgres://jezebel:password123@localhost/transsdb'
    }
  },
  websocket: {
    deployment: ['ws://unitedtranssexuals.org', 'wss://unitedtranssexuals.org', 'https://unitedtranssexuals.org'],
    development: ['ws://localhost:6660', 'wss://localhost:6660', 'http://localhost:6660', 'https://localhost:6660']
  }
});

/***/ }),

/***/ "./libs/db/postgres.js":
/*!*****************************!*\
  !*** ./libs/db/postgres.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Database: () => (/* binding */ Database),
/* harmony export */   shutdown: () => (/* binding */ shutdown)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config */ "./config.js");



var pgp = __webpack_require__(/*! pg-promise */ "pg-promise")();
var Database = pgp(_config__WEBPACK_IMPORTED_MODULE_2__["default"].database.postgres.use === 'deployment' ? _config__WEBPACK_IMPORTED_MODULE_2__["default"].database.postgres.deployment : _config__WEBPACK_IMPORTED_MODULE_2__["default"].database.postgres.development);

// (setup) initialize tables if not exists.

var createSession = /*#__PURE__*/function () {
  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee() {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", Database.none("\n    CREATE TABLE IF NOT EXISTS session (\n        sid varchar NOT NULL,\n        sess json NOT NULL,\n        expire timestamp(6) NOT NULL\n    )\n    WITH (\n        OIDS = FALSE\n    );\n\n    ALTER TABLE \"session\"\n        ADD CONSTRAINT \"session_pkey\" PRIMARY KEY (\"sid\") NOT DEFERRABLE INITIALLY \n    IMMEDIATE;\n"));
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function createSession() {
    return _ref.apply(this, arguments);
  };
}();
var alterSessionDrop = /*#__PURE__*/function () {
  var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee2() {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", Database.none("\n    ALTER TABLE \"session\" DROP CONSTRAINT IF EXISTS \"session_pkey\"\n"));
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function alterSessionDrop() {
    return _ref2.apply(this, arguments);
  };
}();
var alterSessionAdd = /*#__PURE__*/function () {
  var _ref3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee3() {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", Database.none("\n    ALTER TABLE \"session\"\n        ADD CONSTRAINT \"session_pkey\" PRIMARY KEY (\"sid\") NOT DEFERRABLE INITIALLY \n    IMMEDIATE\n"));
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function alterSessionAdd() {
    return _ref3.apply(this, arguments);
  };
}();
var createPublicUsers = /*#__PURE__*/function () {
  var _ref4 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee4() {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", Database.none("\n    CREATE TABLE IF NOT EXISTS \"public\".\"users\" (\n        uuid uuid NOT NULL DEFAULT uuid_generate_v4(),\n        email varchar NOT NULL,\n        PASSWORD varchar NOT NULL,\n        LANGUAGE varchar,\n        permission varchar\n    )\n"));
        case 1:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function createPublicUsers() {
    return _ref4.apply(this, arguments);
  };
}();
createSession()["catch"](function (error) {
  // console.log('createSession: ', error);
});
alterSessionDrop()["catch"](function (error) {
  // console.log('alterSessionDrop: ', error);
});
alterSessionAdd()["catch"](function (error) {
  // console.log('alterSessionAdd: ', error);
});
createPublicUsers()["catch"](function (error) {
  // console.log('createPublicUsers: ', error);
});

// todo make universal db functions (here) if necessary.

var shutdown = /*#__PURE__*/function () {
  var _ref5 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee6() {
    var endPostgres;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          endPostgres = /*#__PURE__*/function () {
            var _ref6 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee5() {
              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    return _context5.abrupt("return", pgp.end());
                  case 1:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5);
            }));
            return function endPostgres() {
              return _ref6.apply(this, arguments);
            };
          }();
          endPostgres()["catch"](function (error) {
            console.log('endPostgres: ', error);
          });
        case 2:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function shutdown() {
    return _ref5.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./libs/user/userMiddleware.js":
/*!*************************************!*\
  !*** ./libs/user/userMiddleware.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   login: () => (/* binding */ login),
/* harmony export */   logout: () => (/* binding */ logout),
/* harmony export */   register: () => (/* binding */ register),
/* harmony export */   socketHandler: () => (/* binding */ socketHandler)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "@babel/runtime/helpers/toConsumableArray");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _userModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./userModal */ "./libs/user/userModal.js");



/**
 * @function login
 * @param req object
 * @param res object
 * @description handles the login process.
 */
var login = function login(req, res) {
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
  var user = {
    email: req.body.email,
    password: req.body.password
  };
  _userModal__WEBPACK_IMPORTED_MODULE_1__.authenticate(user).then(function (authenticate) {
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
      user: req.session.user
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
var register = function register(req, res) {
  if (req.session.user) {
    res.cookie('session', JSON.stringify({
      user: req.session.user
    }));
    return res.redirect('/');
  }
  var user = {
    email: req.body.email,
    password: req.body.password,
    captcha: req.body.captcha
  };
  _userModal__WEBPACK_IMPORTED_MODULE_1__.register(user).then(function (registration) {
    if (registration.error) {
      return res.send(registration);
    }
    _userModal__WEBPACK_IMPORTED_MODULE_1__.authenticate(user).then(function (authenticate) {
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
    })["catch"](function (error) {
      console.log('error:');
      console.log(error);
    });
    return res.redirect('/');
  })["catch"](function (error) {
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
var logout = function logout(req, res, next) {
  if (req.session.user) {
    req.session.destroy(function (err) {
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
var socketHandler = function socketHandler(socket) {
  socket.on('public', function (data) {
    console.log('socket.on public..');
    if (data.api) {
      if (data.api === 'user') {
        console.log('api: user');
        if (socket.handshake.session.user !== undefined) {
          _userModal__WEBPACK_IMPORTED_MODULE_1__.get(socket.handshake.session.user.uuid, function (err, user) {
            console.log('user is:');
            console.log(user);
            if (user) {
              socket.emit('public', {
                api: 'user',
                user: user
              });
            } else {
              // Error or user hasn't created market.
              socket.emit('public', {
                api: 'user',
                user: null
              });
            }
          });
        }
      } else if (data.api === 'update') {
        console.log('api: update');
        if (socket.handshake.session.user !== undefined) {
          var user = {};
          // Verify and cleanup data.
          if (data.details !== undefined) {
            user.uuid = socket.handshake.session.user.uuid;
            user.email = socket.handshake.session.user.email;
            user["public"] = data.details["public"] !== undefined ? data.details["public"] : {
              markerID: 'u001',
              message: ''
            };
          }
          _userModal__WEBPACK_IMPORTED_MODULE_1__.update(socket.handshake.session.user.uuid, data.details !== undefined ? user : null, function (err, dbUser) {
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
          var _user = {};
          // Verify and cleanup data.
          console.log(data);
          if (data.details !== undefined) {
            _user.uuid = socket.handshake.session.user.uuid;
            if (data.details.loc !== undefined && data.details.loc.coordinates !== undefined && data.details.loc.coordinates.length > 0) {
              _user.loc = {
                coordinates: _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(data.details.loc.coordinates)
              };
            }
          }
          console.log(_user);
          _userModal__WEBPACK_IMPORTED_MODULE_1__.update(socket.handshake.session.user.uuid, data.details !== undefined ? _user : null, function (err, dbUser) {
            if (dbUser) {
              // User details exists - update
              console.log('user update - success');
            } else {
              console.log('user update - failed');
            }
          });
        }
      }
    }
  });
};

/***/ }),

/***/ "./libs/user/userModal.js":
/*!********************************!*\
  !*** ./libs/user/userModal.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   all: () => (/* binding */ all),
/* harmony export */   authenticate: () => (/* binding */ authenticate),
/* harmony export */   create: () => (/* binding */ create),
/* harmony export */   get: () => (/* binding */ get),
/* harmony export */   register: () => (/* binding */ register),
/* harmony export */   remove: () => (/* binding */ remove),
/* harmony export */   update: () => (/* binding */ update)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ "bcryptjs");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _db_postgres__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../db/postgres */ "./libs/db/postgres.js");





/**
 * @function hash
 * @param data string
 * @description bcrypt hash string
 */
var hash = function hash(data) {
  return bcryptjs__WEBPACK_IMPORTED_MODULE_2___default().hashSync(data, 8);
};

/**
 * @function isEmpty
 * @param str string
 * @description Check if str is string or empty.
 */
var isEmpty = function isEmpty(str) {
  return !str || typeof str !== 'string' || str.length === 0;
};

/**
 * @function create
 * @param user object
 * @description create user in the database.
 */
var create = /*#__PURE__*/function () {
  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee(user) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _db_postgres__WEBPACK_IMPORTED_MODULE_3__.Database.one('INSERT INTO users(email, password) VALUES($1, $2) RETURNING uuid', [user.email, hash(user.password)]).then(function (data) {
            return data;
          })["catch"](function (error) {
            return {
              error: 'create',
              description: 'The account could not be created.'
            };
          });
        case 2:
          return _context.abrupt("return", _context.sent);
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function create(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * @function update
 * @param uuid string
 * @param user object
 * @description update user by uuid.
 */
var update = /*#__PURE__*/function () {
  var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee2(uuid, user) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!isEmpty(uuid)) {
            _context2.next = 2;
            break;
          }
          return _context2.abrupt("return", null);
        case 2:
          _context2.next = 4;
          return _db_postgres__WEBPACK_IMPORTED_MODULE_3__.Database.none('UPDATE users set email=$1, password=$2 where uuid=$3', [user.email, hash(user.password)]).then(function () {
            return user;
          })["catch"](function (error) {
            console.log('error:');
            console.log(error);
            return null;
          });
        case 4:
          return _context2.abrupt("return", _context2.sent);
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function update(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * @function register
 * @param user object
 * @description register verification and uses create().
 */
var register = /*#__PURE__*/function () {
  var _ref3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee3(user) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (!(isEmpty(user.email) || isEmpty(user.password))) {
            _context3.next = 2;
            break;
          }
          return _context3.abrupt("return", {
            error: 'register',
            description: 'Please provide correct login values.'
          });
        case 2:
          _context3.next = 4;
          return _db_postgres__WEBPACK_IMPORTED_MODULE_3__.Database.any('select * from users where email = $1', user.email).then(function (data) {
            if (data.length > 0) {
              return {
                error: 'register',
                description: 'The email used, has already registered an account.'
              };
            }
            // success.
            return create(user).then(function (uuid) {
              if (uuid.error) {
                return {
                  error: 'register',
                  description: create.description
                };
              }
              return uuid;
            });
          })["catch"](function (error) {
            console.log('error:');
            console.log(error);
            return {
              error: 'register',
              description: 'The server is encountering an issue with registration.'
            };
          });
        case 4:
          return _context3.abrupt("return", _context3.sent);
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function register(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * @function remove
 * @param uuid string
 * @description remove user matching uuid.
 */
var remove = /*#__PURE__*/function () {
  var _ref4 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee4(uuid) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _db_postgres__WEBPACK_IMPORTED_MODULE_3__.Database.result('delete from users where uuid = $1', uuid).then(function (data) {
            return null;
          })["catch"](function (error) {
            return null;
          });
        case 2:
          return _context4.abrupt("return", _context4.sent);
        case 3:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function remove(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * @function authenticate
 * @param user object
 * @description authenticate user if password is correct.
 */
var authenticate = /*#__PURE__*/function () {
  var _ref5 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee5(user) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          if (!(isEmpty(user.email) || isEmpty(user.password))) {
            _context5.next = 2;
            break;
          }
          return _context5.abrupt("return", {
            error: 'authenticate validate',
            description: 'incorrect details'
          });
        case 2:
          _context5.next = 4;
          return _db_postgres__WEBPACK_IMPORTED_MODULE_3__.Database.any('SELECT * from users WHERE email = $1', user.email).then(function (data) {
            var myData = data[0];
            if (myData.email && bcryptjs__WEBPACK_IMPORTED_MODULE_2___default().compareSync(user.password, myData.password)) {
              return myData;
            }
            return {
              error: 'authenticate',
              description: 'Sorry, incorrect values for login!'
            };
          })["catch"](function (error) {
            return {
              error: 'database',
              description: 'The account could not be authenticated.'
            };
          });
        case 4:
          return _context5.abrupt("return", _context5.sent);
        case 5:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function authenticate(_x6) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * @function get
 * @param uuid string
 * @description get user by uuid
 */
var get = /*#__PURE__*/function () {
  var _ref6 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee6(uuid) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          if (!isEmpty(uuid)) {
            _context6.next = 2;
            break;
          }
          return _context6.abrupt("return", null);
        case 2:
          _context6.next = 4;
          return _db_postgres__WEBPACK_IMPORTED_MODULE_3__.Database.any('SELECT * FROM users WHERE uuid = $1', uuid).then(function (data) {
            return data;
          })["catch"](function (error) {
            return null;
          });
        case 4:
          return _context6.abrupt("return", _context6.sent);
        case 5:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function get(_x7) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * @function all
 * @description get all users
 */
var all = /*#__PURE__*/function () {
  var _ref7 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee7() {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return _db_postgres__WEBPACK_IMPORTED_MODULE_3__.Database.any('SELECT * FROM users').then(function (data) {
            return data;
          })["catch"](function (error) {
            console.log('error:');
            console.log(error);
            return null;
          });
        case 2:
          return _context7.abrupt("return", _context7.sent);
        case 3:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function all() {
    return _ref7.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./routes/index.js":
/*!*************************!*\
  !*** ./routes/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _libs_user_userMiddleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../libs/user/userMiddleware */ "./libs/user/userMiddleware.js");


var router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();

/**
 * POST request - User can login.
 */
router.post('/login', _libs_user_userMiddleware__WEBPACK_IMPORTED_MODULE_1__.login);

/**
 * POST request - User can register.
 */
router.post('/register', _libs_user_userMiddleware__WEBPACK_IMPORTED_MODULE_1__.register);

/**
 * POST request - User can logout.
 */
router.post('/logout', _libs_user_userMiddleware__WEBPACK_IMPORTED_MODULE_1__.logout);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);

/***/ }),

/***/ "@babel/runtime/helpers/asyncToGenerator":
/*!**********************************************************!*\
  !*** external "@babel/runtime/helpers/asyncToGenerator" ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = require("@babel/runtime/helpers/asyncToGenerator");

/***/ }),

/***/ "@babel/runtime/helpers/toConsumableArray":
/*!***********************************************************!*\
  !*** external "@babel/runtime/helpers/toConsumableArray" ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = require("@babel/runtime/helpers/toConsumableArray");

/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*********************************************!*\
  !*** external "@babel/runtime/regenerator" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = require("@babel/runtime/regenerator");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "debug":
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/***/ ((module) => {

module.exports = require("debug");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "pg-promise":
/*!*****************************!*\
  !*** external "pg-promise" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("pg-promise");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./bin/www.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app */ "./app.js");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config */ "./config.js");
/**
 * Module dependencies.
 */



var debug = __webpack_require__(/*! debug */ "debug")('psychedelices:server');

/**
 * Normalize a port into a number, string, or false.
 */
var normalizePort = function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
};

/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || _config__WEBPACK_IMPORTED_MODULE_2__["default"].port.server);
_app__WEBPACK_IMPORTED_MODULE_0__["default"].set('port', port);

/**
 * Event listener for HTTP server "error" event.
 */

var onError = function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */

var onListening = function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
};

/**
 * Create HTTP server.
 */
var server = http__WEBPACK_IMPORTED_MODULE_1___default().createServer(_app__WEBPACK_IMPORTED_MODULE_0__["default"]);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
})();

/******/ })()
;
//# sourceMappingURL=unitedtranssexuals-webpack.bundle.js.map