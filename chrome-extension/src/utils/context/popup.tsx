import React, {
    createContext,
    useContext,
    useState,
} from 'react';



export const PopupContext = createContext<any>(null);

export function PopupProvider({children}: {children: React.ReactNode}) {
    const [recentBookmarks, setRecentBookmarks] = useState<any[]>([]);  
    return (
        <PopupContext value={{ recentBookmarks, setRecentBookmarks }}>
            {children}
        </PopupContext>
    );
};

export const usePopupContext = (): any => {
    const context = useContext(PopupContext);
    console.log('usePopupContext -> context:', context);
    if (!context) {
        throw new Error('usePopupContext must be used within a PopupProvider');
    }
    return context;
};