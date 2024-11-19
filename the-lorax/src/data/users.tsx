async function fetchUserData() {
    const token = localStorage.getItem("token"); // Retrieve token from local storage

    if (!token) {
        alert("You are not logged in!");
        return [];
    }

    try {
        const backend = process.env.REACT_APP_FASTAPI_URL || "";
        console.log(`${backend}users`)
        const response = await fetch(`${backend}users`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            alert("Failed to fetch user data.");
            return [];
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return [];
    }
}

export default fetchUserData;