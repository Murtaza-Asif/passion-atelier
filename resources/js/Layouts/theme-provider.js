import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
const ThemeCtx = createContext({
    theme: "light",
    toggle: () => { },
});
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light");
    useEffect(() => {
        const stored = (typeof window !== "undefined" && localStorage.getItem("passion-theme"));
        const initial = stored ?? "light";
        setTheme(initial);
        document.documentElement.classList.toggle("dark", initial === "dark");
    }, []);
    const toggle = () => {
        setTheme((prev) => {
            const next = prev === "dark" ? "light" : "dark";
            document.documentElement.classList.toggle("dark", next === "dark");
            try {
                localStorage.setItem("passion-theme", next);
            }
            catch { }
            return next;
        });
    };
    return _jsx(ThemeCtx.Provider, { value: { theme, toggle }, children: children });
}
export const useTheme = () => useContext(ThemeCtx);
