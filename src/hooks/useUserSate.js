import { useSelector } from "react-redux";
const useUserState = () => {
    const { users, isLoading, error, isLoggedIn, userData } = useSelector((state) => state.users);
    return {
        users,
        isLoading,
        error,
        isLoggedIn,
        userData,
    };
};
export default useUserState;
