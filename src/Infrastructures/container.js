const { createContainer } = require('instances-container')

// external agency
const { nanoid } = require('nanoid')
const bcrypt = require('bcrypt')
const Jwt = require('@hapi/jwt')
const pool = require('./database/postgres/pool')

// service (repository, helper, manager, etc)
const UserRepository = require('../Domains/users/UserRepository')
const AuthenticationRepository = require('../Domains/authentications/AuthenticationRepository')
const ThreadRepository = require('../Domains/threads/ThreadRepository')
const CommentRepository = require('../Domains/comments/CommentRepository')
const PasswordHash = require('../Applications/security/PasswordHash')
const UserRepositoryPostgres = require('./repository/UserRepositoryPostgres')
const AuthenticationRepositoryPostgres = require('./repository/AuthenticationRepositoryPostgres')
const ThreadRepositoryPostgres = require('./repository/ThreadRepositoryPostgres')
const CommentRepositoryPostgres = require('./repository/CommentRepositoryPostgres')
const BcryptPasswordHash = require('./security/BcryptPasswordHash')
const AuthenticationTokenManager = require('../Applications/security/AuthenticationTokenManager')
const JwtTokenManager = require('./security/JwtTokenManager')

// use case
const AddUserUseCase = require('../Applications/use_case/users/AddUserUseCase')
const LoginUserUseCase = require('../Applications/use_case/authentications/LoginUserUseCase')
const LogoutUserUseCase = require('../Applications/use_case/authentications/LogoutUserUseCase')
const DeleteAuthenticationUseCase = require('../Applications/use_case/authentications/DeleteAuthenticationUseCase')
const RefreshAuthenticationUseCase = require('../Applications/use_case/authentications/RefreshAuthenticationUseCase')
const AddThreadUseCase = require('../Applications/use_case/threads/AddThreadUseCase')
const DetailThreadUseCase = require('../Applications/use_case/threads/DetailThreadUseCase')
const AddCommentUseCase = require('../Applications/use_case/comments/AddCommentUseCase')
const DeleteCommentUseCase = require('../Applications/use_case/comments/DeleteCommentUseCase')

// create container
const container = createContainer()

// register services and repository
container.register([
  { // user repository
    key: UserRepository.name,
    Class: UserRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool
        },
        {
          concrete: nanoid
        }
      ]
    }
  },
  { // authentication reposiroty
    key: AuthenticationRepository.name,
    Class: AuthenticationRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool
        }
      ]
    }
  },
  { // thread repository
    key: ThreadRepository.name,
    Class: ThreadRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool
        },
        {
          concrete: nanoid
        }
      ]
    }
  },
  { // comment repository
    key: CommentRepository.name,
    Class: CommentRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool
        },
        {
          concrete: nanoid
        }
      ]
    }
  },
  { // password hash
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt
        }
      ]
    }
  },
  { // authentication token manager
    key: AuthenticationTokenManager.name,
    Class: JwtTokenManager,
    parameter: {
      dependencies: [
        {
          concrete: Jwt.token
        }
      ]
    }
  }
])

// registering use cases
container.register([
  { // add user use case
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name
        }
      ]
    }
  },
  { // login user use case
    key: LoginUserUseCase.name,
    Class: LoginUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name
        },
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name
        },
        {
          name: 'authenticationTokenManager',
          internal: AuthenticationTokenManager.name
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name
        }
      ]
    }
  },
  { // logout user use case
    key: LogoutUserUseCase.name,
    Class: LogoutUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name
        }
      ]
    }
  },
  { // refresh authentication use case
    key: RefreshAuthenticationUseCase.name,
    Class: RefreshAuthenticationUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name
        },
        {
          name: 'authenticationTokenManager',
          internal: AuthenticationTokenManager.name
        }
      ]
    }
  },
  { // delete authentication use case
    key: DeleteAuthenticationUseCase.name,
    Class: DeleteAuthenticationUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name
        }
      ]
    }
  },
  { // add thread use case
    key: AddThreadUseCase.name,
    Class: AddThreadUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'threadRepository',
          internal: ThreadRepository.name
        }
      ]
    }
  },
  { // detail thread use case
    key: DetailThreadUseCase.name,
    Class: DetailThreadUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'commentRepository',
          internal: CommentRepository.name
        },
        {
          name: 'threadRepository',
          internal: ThreadRepository.name
        }
      ]
    }
  },
  { // add comment use case
    key: AddCommentUseCase.name,
    Class: AddCommentUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'commentRepository',
          internal: CommentRepository.name
        },
        {
          name: 'threadRepository',
          internal: ThreadRepository.name
        }
      ]
    }
  },
  { // delete comment use case
    key: DeleteCommentUseCase.name,
    Class: DeleteCommentUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'commentRepository',
          internal: CommentRepository.name
        },
        {
          name: 'threadRepository',
          internal: ThreadRepository.name
        }
      ]
    }
  }
])

module.exports = container
