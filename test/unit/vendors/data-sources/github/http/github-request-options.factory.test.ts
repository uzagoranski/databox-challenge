import { GitHubHttpConfig } from '../../../../../../src/vendors/data-sources/github/interfaces/github-config.interface'
import { GitHubRequestOptionsFactory } from '../../../../../../src/vendors/data-sources/github/http/github-request-options.factory'
import { GITHUB_ACCESS_TOKEN, GITHUB_HTTP_CONFIG, HTTP_MODULE_OPTIONS } from '../../../../../__mocks__/github-request-options.factory.mock'

describe('GitHubRequestOptionsFactory', () => {
  const gitHubHttpConfig: GitHubHttpConfig = GITHUB_HTTP_CONFIG

  let gitHubRequestOptionsFactory: GitHubRequestOptionsFactory

  beforeEach(() => {
    gitHubRequestOptionsFactory = new GitHubRequestOptionsFactory(gitHubHttpConfig)
  })

  describe('buildUrl', () => {
    test('should be called with no path parameter', async () => {
      const result = gitHubRequestOptionsFactory.buildUrl()

      expect(result).toStrictEqual('https://api.github.com/repos/github/advisory-database')
    })

    test('should be called with commits path parameter', async () => {
      const date = new Date()
      date.setDate(date.getDate() - 1)
      const yesterday = date.toISOString()

      const commitsPath = `commits?since=${yesterday}`

      const result = gitHubRequestOptionsFactory.buildUrl(commitsPath)

      expect(result).toStrictEqual(`https://api.github.com/repos/github/advisory-database/commits?since=${yesterday}`)
    })

    test('should be called with pull requests path parameter', async () => {
      const pullRequestsPath = 'pulls?state=open&per_page=100'

      const result = gitHubRequestOptionsFactory.buildUrl(pullRequestsPath)

      expect(result).toStrictEqual(`https://api.github.com/repos/github/advisory-database/pulls?state=open&per_page=100`)
    })
  })

  describe('getConfig', () => {
    test('should return expected config variables', async () => {
      const result = gitHubRequestOptionsFactory.getConfig()

      expect(result).toStrictEqual(GITHUB_HTTP_CONFIG)
    })
  })

  describe('createFormRequestOptions', () => {
    test('should return expected form request options', async () => {
      const result = gitHubRequestOptionsFactory.createFormRequestOptions(GITHUB_ACCESS_TOKEN)

      expect(result).toStrictEqual(HTTP_MODULE_OPTIONS)
    })
  })
})
