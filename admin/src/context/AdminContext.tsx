import { PropsWithChildren, createContext, useContext, useState } from "react";

interface Credentials {
    email: string;
    password: string;
}

interface AdminContext {
    loginAdmin: boolean | null;
    fetchAdmin: (admin: Credentials) => Promise<string | void>;
}

const AdminContext = createContext<AdminContext>({
    loginAdmin: null,
    fetchAdmin: async () => Promise.resolve()
})

export const useAdminContext = () => useContext(AdminContext);

const AdminProvider = ({ children }: PropsWithChildren<object>) => {
    const [loginAdmin, setLoginAdmin] = useState<boolean | null>(false);

    async function fetchAdmin(admin: Credentials): Promise<void> {
        try {
            const response = await fetch ("/api/admin/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(admin),
            })
      
            if(response.ok){
              // const data = await response.json();
                setLoginAdmin(true);
            } else {
                setLoginAdmin(false);
            }
          } catch (error) {
            console.error("Error: ", error)
          }
    }

    return (
        <AdminContext.Provider value={{ loginAdmin, fetchAdmin }}>
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