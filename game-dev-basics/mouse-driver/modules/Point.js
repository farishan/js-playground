/** Point -
 * Simple geometry point with x and y axis
 * @see https://en.wikipedia.org/wiki/Point_(geometry)
 * @returns Point instance
 */
function Point(setting = {}) {
    this.x = setting.x || null
    this.y = setting.y || null

    return this
}

export default Point