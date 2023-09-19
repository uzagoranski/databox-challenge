import { Mock } from 'ts-mockery'
import { Response } from 'express'
import { DbWritingService } from '../../../../../src/libs/db/services/db-writing.service'
import { GitHubAuthenticationService } from '../../../../../src/vendors/data-sources/github/services/github-authentication.service'
import { AuthenticationService } from '../../../../../src/modules/authentication/services/authentication.service'
import { AUTHENTICATION_ENTITY, AUTHENTICATION_RESPONSE } from '../../../../__mocks__/authentication.service.mock'

describe('AuthenticationService', () => {
  const authenticateUser = jest.fn()
  const deleteAuthentication = jest.fn()
  const dbWritingService = Mock.of<DbWritingService>({ deleteAuthentication })
  const gitHubAuthenticationService = Mock.of<GitHubAuthenticationService>({ authenticateUser })

  const res = {} as unknown as Response
  res.json = jest.fn()
  res.send = jest.fn()
  res.status = jest.fn(() => res)

  const code = (Math.random() + 1).toString(36).substring(7)

  let authenticationService: AuthenticationService

  beforeEach(() => {
    authenticationService = new AuthenticationService(dbWritingService, gitHubAuthenticationService)
  })

  describe('authenticateGitHubAccount', () => {
    test('should be called with no code parameter (1st step of OAuth2 flow)', async () => {
      authenticateUser.mockReturnValue(null)

      const result = await authenticationService.authenticateGitHubAccount(res)

      expect(result).toEqual(null)
    })

    test('should be called with code parameter (2nd step of OAuth2 flow)', async () => {
      authenticateUser.mockReturnValue(AUTHENTICATION_ENTITY)

      const result = await authenticationService.authenticateGitHubAccount(res, code)

      expect(authenticateUser).toHaveBeenCalledWith(res, code)
      expect(result).toEqual(AUTHENTICATION_RESPONSE)
    })
  })

  describe('removeGitHubAuthentication', () => {
    test('should be called using expected params and return expected response', async () => {
      deleteAuthentication.mockImplementationOnce(() => Promise.resolve())

      const result = await authenticationService.removeGitHubAuthentication()

      expect(result).toBeUndefined()
    })
  })
})
