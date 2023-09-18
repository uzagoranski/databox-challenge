// import { Enums, Interfaces } from '@united/shared'
// import { UserRoles } from '@united/shared/src/enum'
// import moment from 'moment'
// import { Mock } from 'ts-mockery'
// import { ProjectRepository } from '../../../src/project/repositories/project.repository'
// import { UserDailyActivityEntity } from '../../../src/userDailyActivity/entities/userDailyActivity.entity'
// import { UserDailyActivityRepository } from '../../../src/userDailyActivity/repositories/userDailyActivity.repository'
// import { UserDailyActivityService } from '../../../src/userDailyActivity/userDailyActivity.service'
//
// const JWT_USER_ID = 2
// const JWT_ADMIN_ID = 20
// const JWT_COMPANY = 3
// const JWT_MODEL = Mock.of<Interfaces.IJwtModel>({ userId: JWT_USER_ID, companyId: JWT_COMPANY, roles: [ UserRoles.User ] })
// const JWT_MODEL_ADMIN = Mock.of<Interfaces.IJwtModel>({ userId: JWT_ADMIN_ID, companyId: JWT_COMPANY, roles: [ UserRoles.Admin ] })
//
// const USER_DAILY_ACTIVITY_ID = 1
// const USER_DAILY_ACTIVITY_USER_ID = JWT_MODEL.userId
// const USER_DAILY_ACTIVITY_PROJECT_ID = 3
// const USER_DAILY_ACTIVITY_DATE = moment().toDate()
// const USER_DAILY_ACTIVITY_WORK_LOCATION = Enums.WorkLocation.Home
// const USER_DAILY_ACTIVITY_DATE_REPORTED_ON = moment().toDate()
// const USER_DAILY_ACTIVITY_DATE_CREATED_ON = moment().toDate()
//
// const USER_DAILY_ACTIVITY_ENTITY: UserDailyActivityEntity = Mock.of<UserDailyActivityEntity>({
//   id: USER_DAILY_ACTIVITY_ID,
//   userId: USER_DAILY_ACTIVITY_USER_ID,
//   projectId: USER_DAILY_ACTIVITY_PROJECT_ID,
//   date: USER_DAILY_ACTIVITY_DATE,
//   workLocation: USER_DAILY_ACTIVITY_WORK_LOCATION,
//   dateReportedOn: USER_DAILY_ACTIVITY_DATE_REPORTED_ON,
//   reportedById: USER_DAILY_ACTIVITY_USER_ID,
//   dateUpdatedAt: USER_DAILY_ACTIVITY_DATE_CREATED_ON,
// })
//
// const USER_DAILY_ACTIVITY_INTERFACE: Interfaces.IUserDailyActivity = Mock.of<Interfaces.IUserDailyActivity>({
//   userId: USER_DAILY_ACTIVITY_USER_ID,
//   projectId: USER_DAILY_ACTIVITY_PROJECT_ID,
//   date: USER_DAILY_ACTIVITY_DATE,
//   workLocation: USER_DAILY_ACTIVITY_WORK_LOCATION,
//   dateReportedOn: USER_DAILY_ACTIVITY_DATE_REPORTED_ON,
//   dateUpdatedAt: USER_DAILY_ACTIVITY_DATE_CREATED_ON,
// })
//
// const USER_DAILY_ACTIVITY_CREATE: Interfaces.IUserDailyActivity = { ...USER_DAILY_ACTIVITY_INTERFACE }
//
// describe('userDailyActivity service (unit)', () => {
//   let userDailyActivityService: UserDailyActivityService
//
//   const mockUserDailyActivityRepository: UserDailyActivityRepository = Mock.of<UserDailyActivityRepository>()
//   const mockProjectRepository: ProjectRepository = Mock.of<ProjectRepository>()
//
//   beforeEach(() => {
//     jest.clearAllMocks()
//     userDailyActivityService = new UserDailyActivityService(mockUserDailyActivityRepository, mockProjectRepository)
//   })
//   describe('Add or Update UserDailyActivityEntity', () => {
//     beforeEach(() => {
//       mockProjectRepository.findOrFail = jest.fn().mockResolvedValue({})
//     })
//
//     describe('Add UserDailyActivityEntity', () => {
//       beforeEach(() => {
//         mockUserDailyActivityRepository.save = jest.fn().mockResolvedValue(USER_DAILY_ACTIVITY_ENTITY)
//         mockUserDailyActivityRepository.findOne = jest.fn().mockResolvedValue(undefined)
//       })
//       test('User can report UserDailyActivity', async () => {
//         const result = await userDailyActivityService.addOrUpdateDailyActivity(JWT_COMPANY, JWT_USER_ID, JWT_MODEL, USER_DAILY_ACTIVITY_CREATE)
//         expect(result).toEqual(USER_DAILY_ACTIVITY_ENTITY)
//       })
//     })
//
//     describe('Update UserDailyActivityEntity', () => {
//       beforeEach(() => {
//         mockUserDailyActivityRepository.save = jest.fn().mockResolvedValue({ ...USER_DAILY_ACTIVITY_ENTITY, workLocation: Enums.WorkLocation.Company })
//         mockUserDailyActivityRepository.findOne = jest.fn().mockResolvedValue(USER_DAILY_ACTIVITY_ENTITY)
//       })
//       test('User can update UserDailyActivity', async () => {
//         const result = await userDailyActivityService.addOrUpdateDailyActivity(JWT_COMPANY, JWT_USER_ID, JWT_MODEL, USER_DAILY_ACTIVITY_CREATE)
//         expect(result).toEqual({ ...USER_DAILY_ACTIVITY_ENTITY, workLocation: Enums.WorkLocation.Company })
//       })
//     })
//
//     describe('Admin Add UserDailyActivityEntity', () => {
//       beforeEach(() => {
//         mockUserDailyActivityRepository.save = jest.fn().mockResolvedValue({ ...USER_DAILY_ACTIVITY_ENTITY, reportedById: JWT_MODEL_ADMIN.userId })
//         mockUserDailyActivityRepository.findOne = jest.fn().mockResolvedValue(undefined)
//       })
//       test('Admin can report UserDailyActivity', async () => {
//         const result = await userDailyActivityService.addOrUpdateDailyActivity(JWT_COMPANY, JWT_USER_ID, JWT_MODEL_ADMIN, USER_DAILY_ACTIVITY_CREATE)
//         expect(result).toEqual({ ...USER_DAILY_ACTIVITY_ENTITY, reportedById: JWT_ADMIN_ID })
//       })
//     })
//
//     describe('Admin Update UserDailyActivityEntity', () => {
//       beforeEach(() => {
//         mockUserDailyActivityRepository.save = jest
//           .fn()
//           .mockResolvedValue({ ...USER_DAILY_ACTIVITY_ENTITY, reportedById: JWT_MODEL_ADMIN.userId, workLocation: Enums.WorkLocation.Company })
//         mockUserDailyActivityRepository.findOne = jest.fn().mockResolvedValue({ ...USER_DAILY_ACTIVITY_ENTITY, reportedById: JWT_MODEL_ADMIN.userId })
//       })
//       test('Admin can update UserDailyActivity', async () => {
//         const result = await userDailyActivityService.addOrUpdateDailyActivity(JWT_COMPANY, JWT_USER_ID, JWT_MODEL_ADMIN, USER_DAILY_ACTIVITY_CREATE)
//         expect(result).toEqual({ ...USER_DAILY_ACTIVITY_ENTITY, reportedById: JWT_ADMIN_ID, workLocation: Enums.WorkLocation.Company })
//       })
//     })
//   })
// })
