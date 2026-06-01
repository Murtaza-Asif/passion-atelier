import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { ThemeProvider } from "./theme-provider";
import { StickyWhatsApp } from "./sticky-whatsapp";
export function AppLayout({ children }) {
    return (_jsx(ThemeProvider, { children: _jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [_jsx(Navbar, {}), _jsx("main", { className: "pt-20", children: children }), _jsx(Footer, {}), _jsx(StickyWhatsApp, {})] }) }));
}
