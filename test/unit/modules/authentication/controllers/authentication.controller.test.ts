import { Mock } from 'ts-mockery'
import { Response } from 'express'
import { AuthenticationService } from '../../../../../src/modules/authentication/services/authentication.service'
import { AuthenticationController } from '../../../../../src/modules/authentication/controllers/authentication.controller'

describe('AuthenticationController', () => {
  const authenticateGitHubAccount = jest.fn()
  const removeGitHubAuthentication = jest.fn()

  const res = {} as unknown as Response
  res.json = jest.fn()
  res.send = jest.fn()
  res.status = jest.fn(() => res)

  const code = (Math.random() + 1).toString(36).substring(7)

  const authenticationService = Mock.of<AuthenticationService>({ authenticateGitHubAccount, removeGitHubAuthentication })

  const authenticationController = new AuthenticationController(authenticationService)

  describe('authenticateGitHubAccount', () => {
    test('should call authenticateGitHubAccount without code', () => {
      authenticationController.authenticateGitHubAccount(res)

      expect(authenticateGitHubAccount).toHaveBeenCalled()
    })

    test('should call authenticateGitHubAccount with code', () => {
      authenticationController.authenticateGitHubAccount(res, code)

      expect(authenticateGitHubAccount).toHaveBeenCalledWith(res, code)
    })
  })

  describe('removeGitHubAuthentication', () => {
    test('should call removeGitHubAuthentication', () => {
      authenticationController.removeGitHubAuthentication()

      expect(removeGitHubAuthentication).toHaveBeenCalled()
    })
  })
})
