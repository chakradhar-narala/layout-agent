export function resizeArtboard(layout, newWidth, newHeight) {
  const updated = structuredClone(layout); 
  const rootId = updated.rootNodes[0];
  const artboard = updated.nodes[rootId];

  artboard.width = newWidth;
  artboard.height = newHeight;

  // Recompute every child from normalized coordinates
  artboard.children.forEach((childId) => {
    const node = updated.nodes[childId];
    node.x = node.nx * newWidth;
    node.y = node.ny * newHeight;
    node.width = node.nw * newWidth;
    node.height = node.nh * newHeight;
  });

  return updated;
}
