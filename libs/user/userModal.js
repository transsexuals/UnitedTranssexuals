import bcrypt from 'bcryptjs';
import {Database} from '../db/postgres';

/**
 * @function hash
 * @param data string
 * @description bcrypt hash string
 */
const hash = (data) => {
  return (bcrypt.hashSync(data, 8));
};

/**
 * @function isEmpty
 * @param str string
 * @description Check if str is string or empty.
 */
const isEmpty = (str) => {
  return (!str || typeof str !== 'string' || str.length === 0);
};

/**
 * @function create
 * @param user object
 * @description create user in the database.
 */
export const create = async(user) => {
  return await Database.one(
    'INSERT INTO users(email, password) VALUES($1, $2) RETURNING uuid',
    [user.email, hash(user.password)]
  ).then((data) => {
    return data;
  }).catch((error) => {
    return {
      error: 'create',
      description: 'The account could not be created.'
    };
  });
};

/**
 * @function update
 * @param uuid string
 * @param user object
 * @description update user by uuid.
 */
export const update = async(uuid, user) => {
  if (isEmpty(uuid)) {
    return null;
  }
  return await Database.none(
    'UPDATE users set email=$1, password=$2 where uuid=$3',
    [user.email, hash(user.password)]
  ).then(() => {
    return user;
  }).catch((error) => {
    console.log('error:');
    console.log(error);
    return null;
  });
};

/**
 * @function register
 * @param user object
 * @description register verification and uses create().
 */
export const register = async (user) => {
  if (isEmpty(user.email) || isEmpty(user.password)) {
    return {
      error: 'register',
      description: 'Please provide correct login values.'
    };
  }
  return await Database.any(
    'select * from users where email = $1',
    user.email
  ).then((data) => {
    if (data.length > 0) {
      return {
        error: 'register',
        description: 'The email used, has already registered an account.'
      };
    }
    // success.
    return create(user).then((uuid) => {
      if (uuid.error) {
        return {
          error: 'register',
          description: create.description
        };
      }
      return uuid;
    });
  }).catch((error) => {
    console.log('error:');
    console.log(error);
    return {
      error: 'register',
      description: 'The server is encountering an issue with registration.'
    };
  });
};

/**
 * @function remove
 * @param uuid string
 * @description remove user matching uuid.
 */
export const remove = async(uuid) => {
  return await Database.result(
    'delete from users where uuid = $1',
    uuid
  ).then((data) => {
    return null;
  }).catch((error) => {
    return null;
  });
};

/**
 * @function authenticate
 * @param user object
 * @description authenticate user if password is correct.
 */
export const authenticate = async(user) => {
  if (isEmpty(user.email) || isEmpty(user.password)) {
    return {
      error: 'authenticate validate',
      description: 'incorrect details'
    };
  }
  return await Database.any(
    'SELECT * from users WHERE email = $1',
    user.email
  ).then((data) => {
    const myData = data[0];
    if (myData.email
      && bcrypt.compareSync(
        user.password,
        myData.password
      )
    ) {
      return myData;
    }
    return {
      error: 'authenticate',
      description: 'Sorry, incorrect values for login!'
    };
  }).catch((error) => {
    return {
      error: 'database',
      description: 'The account could not be authenticated.'
    };
  });
};

/**
 * @function get
 * @param uuid string
 * @description get user by uuid
 */
export const get = async(uuid) => {
  if (isEmpty(uuid)) return null;
  return await Database.any(
    'SELECT * FROM users WHERE uuid = $1',
    uuid
  ).then((data) => {
    return data;
  }).catch((error) => {
    return null;
  });
};

/**
 * @function all
 * @description get all users
 */
export const all = async() => {
  return await Database.any(
    'SELECT * FROM users'
  ).then((data) => {
    return data;
  }).catch((error) => {
    console.log('error:');
    console.log(error);
    return null;
  });
};
