import { Controller, Delete, Get, Query } from '@nestjs/common'
import { ApiBadRequestResponse, ApiNoContentResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator'
import { Res } from '@nestjs/common/decorators/http/route-params.decorator'
import { Response } from 'express'
import { AuthenticationService } from '../services/authentication.service'
import { AuthenticationResponse } from '../responses/authentication.response'

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Get('/GitHub')
  @ApiOperation({ summary: 'Triggers GitHub OAuth2 authentication flow' })
  @ApiOkResponse({ description: 'Authentication with GitHub successful', type: AuthenticationResponse })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async authenticateGitHubAccount(@Res() response: Response, @Query('code') code?: string): Promise<AuthenticationResponse> {
    const authentication = await this.authenticationService.authenticateGitHubAccount(response, code)

    // To complete the request, we have to manually send the response back as we're using
    // the @Res() annotation which interferes with the regular NestJS response handler
    response.status(200).send(authentication)

    return authentication
  }

  @Delete('/GitHub')
  @ApiOperation({ summary: 'Removes existing GitHub OAuth2 authentication' })
  @ApiNoContentResponse({ status: 204, description: 'Authentication successfully removed' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async removeGitHubAuthentication(): Promise<void> {
    return this.authenticationService.removeGitHubAuthentication()
  }
}
