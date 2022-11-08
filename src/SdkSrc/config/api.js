const HOST_URL = "http://192.168.0.104:9000";

export const getToken = async () => {
  try {
    const response = await fetch(`https://backend.hellosuperstars.com/api/sdk/get-token`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.token;
  } catch (e) {
    console.log(e);
  }
};

export const createMeeting = async (token) => {
  try {
    const VIDEOSDK_API_ENDPOINT = `${HOST_URL}/create-meeting`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    };
    const response = await fetch(VIDEOSDK_API_ENDPOINT, options)
      .then(async (result) => {
        const { meetingId } = await result.json();
        return meetingId;
      })
      .catch((error) => console.log("error", error));
    return response;
  } catch (e) {
    console.log(e);
  }
};
