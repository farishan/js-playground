function isIntersect(a, b) {
  if (!a.x || !a.y || !a.width || !a.height) return;
  if (!b.x || !b.y || !b.width || !b.height) return;

  const m = {
    /* top left a */
    tlA: { x: a.x, y: a.y },
    /* bottom right a */
    brA: { x: a.x + a.width, y: a.y + a.height },
    /* top left b */
    tlB: { x: b.x, y: b.y },
    /* bottom right b */
    brB: { x: b.x + b.width, y: b.y + b.height }
  };

  /* on left check */
  if (m.brA.x < m.tlB.x || m.brB.x < m.tlA.x) return;

  /* on top check */
  if (m.brA.y < m.tlB.y || m.brB.y < m.tlA.y) return;

  return true;
}
