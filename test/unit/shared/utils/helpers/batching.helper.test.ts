import { BatchingHelper } from '../../../../../src/shared/utils/helpers/batching.helper'

describe('BatchingHelper', () => {
  it('should create batches according to the data sent', async () => {
    const array: number[] = [ 1, 2, 3, 4, 5, 6, 7 ]

    const batches = BatchingHelper.getBatches(array, 2)

    expect(batches).toStrictEqual([[ 1, 2 ], [ 3, 4 ], [ 5, 6 ], [ 7 ]])
  })
})
