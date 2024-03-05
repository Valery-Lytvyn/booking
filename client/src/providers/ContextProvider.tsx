import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ProviderProps, UserContextType, UserType } from "../types";
import { getData } from "../fetching";

export const UserContext = createContext<UserContextType>({
  ready: false,
  user: null,
  setUser: () => null,
});

export const UserContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!user) {
          const data: UserType = await getData("/profile");
          setUser(data);
          setReady(true);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("Error fetching user profile");
      }
    };
    fetchUserProfile();
  }, [user]);

  return (
    <UserContext.Provider value={{ ready, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
