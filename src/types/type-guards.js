export function isDecodedUser(obj) {
    return (typeof obj === "object" &&
        obj !== null &&
        "username" in obj &&
        "role" in obj &&
        "user_id" in obj);
}
