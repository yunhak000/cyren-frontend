import deviceCheck from "./deviceCheck";
import dayjs from "dayjs";

const handleNetworkChange = (online, userEmail, socket) => {
  if (online) {
    if (deviceCheck() === "desktop") {
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
        }).catch((error) => error && console.log(error));
      });
    }
  } else {
    socket && socket.disconnect();
  }
};

export default handleNetworkChange;
