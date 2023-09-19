import { of } from 'rxjs'
import { Mock } from 'ts-mockery'
import { HttpService } from '@nestjs/axios'
import { GitHubRequestOptionsFactory } from '../../../../../../src/vendors/data-sources/github/http/github-request-options.factory'
import { GitHubService } from '../../../../../../src/vendors/data-sources/github/services/github.service'
import { GitHubAuthenticationService } from '../../../../../../src/vendors/data-sources/github/services/github-authentication.service'
import { AUTHENTICATION_ENTITY } from '../../../../../__mocks__/authentication.service.mock'
import { GITHUB_HTTP_MODULE_OPTIONS, GITHUB_HTTP_MODULE_OPTIONS_NO_AUTHORIZATION } from '../../../../../__mocks__/github-request-options.factory.mock'
import { GITHUB_GET_METRICS, GITHUB_HTTP_CONFIG } from '../../../../../__mocks__/github.service.mock'

describe('GitHubService', () => {
  const get = jest.fn()
  const buildUrl = jest.fn()
  const createFormRequestOptions = jest.fn()
  const getAuthenticationData = jest.fn()
  const updateAuthenticationDataIfExpired = jest.fn()
  const httpService = Mock.of<HttpService>({ get })
  const gitHubRequestOptionsFactory = Mock.of<GitHubRequestOptionsFactory>({ buildUrl, createFormRequestOptions })
  const gitHubAuthenticationService = Mock.of<GitHubAuthenticationService>({ getAuthenticationData, updateAuthenticationDataIfExpired })

  let gitHubService: GitHubService

  beforeEach(() => {
    gitHubService = new GitHubService(httpService, gitHubAuthenticationService, gitHubRequestOptionsFactory)
  })

  describe('getMetrics', () => {
    buildUrl.mockReturnValue(GITHUB_HTTP_CONFIG.baseUrl)
    getAuthenticationData.mockReturnValue(AUTHENTICATION_ENTITY)
    updateAuthenticationDataIfExpired.mockReturnValue(AUTHENTICATION_ENTITY)

    test('should be called using expected params and return expected response', async () => {
      createFormRequestOptions.mockReturnValue(GITHUB_HTTP_MODULE_OPTIONS)
      get.mockReturnValue(of({ data: [ 1, 2, 3, 4, 5 ] }))

      const result = await gitHubService.getMetrics()

      expect(result).toEqual(GITHUB_GET_METRICS)
    })

    test('should be called using no authentication and return erroneous response', async () => {
      createFormRequestOptions.mockReturnValue(GITHUB_HTTP_MODULE_OPTIONS_NO_AUTHORIZATION)
      get.mockImplementation(() => {
        throw new Error()
      })

      try {
        await gitHubService.getMetrics()
      } catch (e) {
        expect(get).toHaveBeenCalledWith(GITHUB_HTTP_CONFIG.baseUrl, GITHUB_HTTP_MODULE_OPTIONS_NO_AUTHORIZATION)

        return expect(get).toThrowError()
      }
    })
  })
})
