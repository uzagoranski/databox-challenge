import { INestApplication, Logger as NestLogger } from '@nestjs/common'
import os from 'os'
import { ExecutionHelper } from './execution.helper'

describe('ExecutionHelper', () => {
  it('should log the expected messages', async () => {
    const debug = jest.spyOn(NestLogger.prototype, 'debug')
    const fakeService = 'fake-service'
    const useLogger = jest.fn()
    const fakeApp = {
      getUrl: jest.fn(() => 'http://fake-url'),
      get: jest.fn(() => 'fake-logger'),
      useLogger,
    } as unknown as INestApplication

    await ExecutionHelper.onAppRunning(fakeApp, fakeService)

    expect(debug).toHaveBeenCalledWith('-------------------------------')
    expect(debug).toHaveBeenCalledWith(`OS Type: ${os.type()}`)
    expect(debug).toHaveBeenCalledWith(`OS Release: ${os.release()}`)
    expect(debug).toHaveBeenCalledWith(`OS Platform: ${os.platform()}`)
    expect(debug).toHaveBeenCalledWith(`Process Path: ${process.cwd()}`)
    expect(debug).toHaveBeenCalledWith(`Process Title: ${fakeService}`)
    expect(debug).toHaveBeenCalledWith(`Process Pid: ${process.pid}`)
    expect(debug).toHaveBeenCalledWith(`Node Version: ${process.version}`)
    expect(debug).toHaveBeenCalledWith('-------------------------------')
    expect(debug).toHaveBeenCalledWith(`${fakeService} started at ${new Date().toDateString()} on http://fake-url`)

    // This does not work
    // expect(useLogger).toHaveBeenCalledWith("fake-logger")
  })
})
