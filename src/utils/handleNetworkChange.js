import deviceCheck from "./deviceCheck";
import dayjs from "dayjs";

const handleNetworkChange = (online, userEmail) => {
  if (deviceCheck() === "desktop") {
    if (online) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const dateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");

        await fetch("http://localhost:8000/locations/nowLocations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            dateTime,
          }),
        });
      });
    }
  }
};

export default handleNetworkChange;
