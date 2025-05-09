import {create} from "zustand"

export const useThemeStore = create((set) => ({
    theme : localStorage.getItem("streamChat-theme") || "coffee" ,
    setTheme: (theme) =>{ 
        localStorage.setItem("streamChat-theme", theme)
        set({theme})}
}))