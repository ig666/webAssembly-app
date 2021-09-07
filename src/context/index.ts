//全局容器
import React from "react";

interface ThemeContextProps {
  color: string;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  color: "",
});
