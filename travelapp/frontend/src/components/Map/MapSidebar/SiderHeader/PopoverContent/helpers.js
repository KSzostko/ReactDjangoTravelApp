export function prepareWaypointsData(stopsList) {
  const result = [];

  stopsList.forEach(({ attraction }) => {
    const { name, lat, lng } = attraction;
    result.push({ name, lat, lng });
  });

  return result;
}
