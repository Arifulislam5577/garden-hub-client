// "use client";

// import { getCurrentUser } from "@/actions/actions";
// import { TUser } from "@/types";
// import {
//   createContext,
//   Dispatch,
//   ReactNode,
//   SetStateAction,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// type ContextProps = {
//   user: TUser | null;
//   loading: boolean;
//   setLoading: Dispatch<SetStateAction<boolean>>;
// };

// const UserContext = createContext<ContextProps | undefined>(undefined);

// const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const handleUser = async () => {
//     const user = await getCurrentUser();

//     setUser(user);
//     setLoading(false);
//   };

//   useEffect(() => {
//     handleUser();
//   }, [loading]);

//   return (
//     <UserContext.Provider value={{ user, loading, setLoading }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);

//   if (context === undefined) {
//     throw new Error("useUser must be used within the UserProvider context");
//   }

//   return context;
// };

// export default AuthProvider;
