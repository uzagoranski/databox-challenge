export class BatchingHelper {
  static getBatches<T>(array: Array<T>, itemsPerBatch = 2): Array<Array<T>> {
    return array.reduce((resultArray, item, index) => {
      const batchIndex = Math.floor(index / itemsPerBatch)

      if (!resultArray[batchIndex]) {
        // eslint-disable-next-line no-param-reassign
        resultArray[batchIndex] = []
      }

      resultArray[batchIndex].push(item)

      return resultArray
    }, [])
  }
}
