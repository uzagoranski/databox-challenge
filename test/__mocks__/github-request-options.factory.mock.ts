import { HttpModuleOptions } from '@nestjs/axios'

export const GITHUB_ACCESS_TOKEN = 'ghu_PqRqHb4duk28T9pZBuB3dsoQsrVJ4vtAX45Q'

export const HTTP_MODULE_OPTIONS: HttpModuleOptions = {
  headers: {
    'Content-Type': 'application/json',
    'X-GitHub-Api-Version': '2022-11-28',
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
  },
}
