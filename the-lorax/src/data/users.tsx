async function fetchUserData() {
    const token = localStorage.getItem("token"); // Retrieve token from local storage

    if (!token) {
        alert("You are not logged in!");
        return [];
    }

    try {
        const response = await fetch("http://localhost:8000/users", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Fetched user data:", data);
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