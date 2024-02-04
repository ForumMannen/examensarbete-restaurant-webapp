import { PropsWithChildren, createContext, useContext, useState, Dispatch, SetStateAction } from "react";
interface Credentials {
  email: string;
  password: string;
}

interface AdminContext {
  isAdmin: Credentials | null;
  setIsAdmin: Dispatch<SetStateAction<Credentials | null>>;
  loginAdmin: (admin: Credentials) => Promise<string | void>;
  logoutAdmin: () => Promise<string | void>;
  authAdmin: () => void,
  isLoading: boolean;
}

const AdminContext = createContext<AdminContext>({
  isAdmin: null,
  setIsAdmin: () => { },
  loginAdmin: async () => Promise.resolve(),
  logoutAdmin: () => Promise.resolve(),
  authAdmin: () => Promise.resolve(),
  isLoading: false
})

export const useAdminContext = () => useContext(AdminContext);

const AdminProvider = ({ children }: PropsWithChildren<object>) => {
  const [isAdmin, setIsAdmin] = useState<Credentials | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function loginAdmin(admin: Credentials): Promise<void> {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(admin),
      })

      if (response.ok) {
        const data = await response.json();
        console.log("Login success");
        setIsAdmin(data);
      } else {
        console.log("Login failed");
        setIsAdmin(null);
      }
    } catch (error) {
      console.error("Error: ", error)
      setIsAdmin(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function logoutAdmin() {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (response.status === 204) {
        setIsAdmin(null);
      } else {
        const data = await response.json();
        return data
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function authAdmin() {
    try {
      const response = await fetch("/api/admin/seeSecret");
      if (response.status === 200) {
        const data = await response.json();
        setIsAdmin(data);
      } else {
        setIsAdmin(null);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin, loginAdmin, logoutAdmin, authAdmin, isLoading }}>
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