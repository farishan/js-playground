/**
 * See /modules/rectangle
 * @param {Rectangle} a Rectangle instance
 * @param {Rectangle} b Rectangle instance
 * @returns {Boolean} Intersection or not
 */
function isIntersect(a, b) {
  const m = {
    /* top left a */
    tlA: a.getTopLeft(),
    /* bottom right a */
    brA: a.getBottomRight(),
    /* top left b */
    tlB: b.getTopLeft(),
    /* bottom right b */
    brB: b.getBottomRight()
  };

  /* on left check */
  if (m.brA.x < m.tlB.x || m.brB.x < m.tlA.x) return;

  /* on top check */
  if (m.brA.y < m.tlB.y || m.brB.y < m.tlA.y) return;

  return true;
}
