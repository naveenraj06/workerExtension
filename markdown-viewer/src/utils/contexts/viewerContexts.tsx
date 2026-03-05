import { createContext, useContext } from "react";

export const ViewerContext = createContext<any>(null);


export const useViewerContext = () => {
    const context = useContext(ViewerContext);
    if (!context) {
        throw new Error("useViewerContext must be used within a ViewerProvider");
    }
    return context;
}