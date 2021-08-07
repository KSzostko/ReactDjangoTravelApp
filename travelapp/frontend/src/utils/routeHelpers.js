export function concatPolylines(route) {
  let fullPolyline = [];

  route.forEach(({ polylineData }) => {
    fullPolyline = fullPolyline.concat(polylineData.polyline);
  });

  return fullPolyline;
}

export function calculateTravelData(route) {
  const totalTime = route.reduce(
    (acc, { summary }) => acc + summary.baseDuration,
    0
  );
  const totalRoute = route.reduce(
    (acc, { summary }) => acc + summary.length,
    0
  );

  return { totalTime, totalRoute };
}
