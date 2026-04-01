import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
  purchasedCourses: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  purchaseCourse: (courseId: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USER: User = {
  name: "Fatima Akter",
  email: "demo@nigar.com",
  phone: "+880 1712-345678",
  avatar: "",
  joinDate: "2026-01-15",
  purchasedCourses: ["recorded"],
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("nfw_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, password: string) => {
    if (email === "demo@nigar.com" && password === "123456") {
      const u = { ...DEMO_USER };
      localStorage.setItem("nfw_user", JSON.stringify(u));
      setUser(u);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("nfw_user");
    setUser(null);
  };

  const purchaseCourse = (courseId: string) => {
    if (user && !user.purchasedCourses.includes(courseId)) {
      const updated = { ...user, purchasedCourses: [...user.purchasedCourses, courseId] };
      localStorage.setItem("nfw_user", JSON.stringify(updated));
      setUser(updated);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, purchaseCourse }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
