// import { useAuth } from "@clerk/nextjs";
// import React, {
//   createContext,
//   useState,
//   useEffect,
//   FC,
//   ReactNode,
//   useContext,
// } from "react";
// import useSWR from "swr";

// interface IAuthContext {
//   userRole: string;
//   isAdmin: () => void;
// }

// const AuthContext = createContext<IAuthContext>({
//   userRole: "",
//   isAdmin: () => {},
// });

// const userFetcher = async (url: string) => {
//   const response = await fetch(url);
//   return response.json();
// };

// const AuthProvider: FC<{ children?: ReactNode }> = ({ children }) => {
//   const [userRole, setUserRole] = useState("");
//   const { data: user } = useSWR("/api/user", userFetcher);

//   useEffect(() => {
//     if (user && user.userRole) {
//       setUserRole(user.userRole);
//     }
//   }, [user]);

//   const isAdmin = () => userRole === "admin";

//   return (
//     <AuthContext.Provider value={{ userRole, isAdmin }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useLocalAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// export { AuthProvider, useLocalAuth };
