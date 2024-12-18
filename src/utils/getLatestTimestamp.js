import moment from "moment";

function getLatestTimestamp(data) {
  if (!Array.isArray(data) || data.length === 0) {
    return null; // Handle empty or invalid input
  }

  // Find the object with the latest timestamp
  const latestItem = data.reduce((latest, current) => {
    const latestTime = moment(
      latest.timestamp.seconds * 1000 + latest.timestamp.nanoseconds / 1e6
    );
    const currentTime = moment(
      current.timestamp.seconds * 1000 + current.timestamp.nanoseconds / 1e6
    );
    return currentTime.isAfter(latestTime) ? current : latest;
  });

  // Format the latest timestamp
  const latestMoment = moment(
    latestItem.timestamp.seconds * 1000 + latestItem.timestamp.nanoseconds / 1e6
  );
  return latestMoment.format("LLL"); // Adjust format as needed
}

export default getLatestTimestamp;
