import { PropsWithChildren, createContext, useContext, useState, Dispatch, SetStateAction } from "react";
interface Credentials {
    email: string;
    password: string;
}

interface AdminContext {
    loginAdmin: boolean | null;
    setLoginAdmin: Dispatch<SetStateAction<boolean | null>>;
    fetchAdmin: (admin: Credentials) => Promise<string | void>;
    logoutAdmin: () => Promise<string | void>;
}

const AdminContext = createContext<AdminContext>({
    loginAdmin: null,
    setLoginAdmin: () => {},
    fetchAdmin: async () => Promise.resolve(),
    logoutAdmin: () => Promise.resolve(),
})

export const useAdminContext = () => useContext(AdminContext);

const AdminProvider = ({ children }: PropsWithChildren<object>) => {
    const [loginAdmin, setLoginAdmin] = useState<boolean | null>(false);

    async function fetchAdmin(admin: Credentials): Promise<void> {
        try {
            const response = await fetch("/api/admin/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(admin),
            })
            
            console.log(response);

            if(response.ok){
              // const data = await response.json();
              console.log("Login success");
                setLoginAdmin(true);
            } else {
              console.log("Login failed");
                setLoginAdmin(false);
            }
          } catch (error) {
            console.error("Error: ", error)
            setLoginAdmin(false);
          }
    }

    async function logoutAdmin(){
      try {
        console.log("Logout function");
        
        const response = await fetch("/api/admin/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }, 
          body: JSON.stringify({}),
        });

        if(response.status === 200){
          setLoginAdmin(false);
        } else {
          const data = await response.json();
          return data
        }
      } catch (error) {
        console.log(error);
        
      }
    }

    return (
        <AdminContext.Provider value={{ loginAdmin, setLoginAdmin, fetchAdmin, logoutAdmin }}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminProvider;













// interface Admin {
//     id: string;
//     email: string;
//     password: string;
//     isAdmin: boolean;
// }