import React from "react";

export function useTokenStatus(tokenKey: string) {
    const [hasToken, setHasToken] = React.useState<boolean>(window.localStorage.getItem(tokenKey) !== null);

    React.useEffect(() => {
        const handler = () => setHasToken(window.localStorage.getItem(tokenKey) !== null)
        window.addEventListener('token-status-changed', handler)

        return () => window.removeEventListener('token-status-changed', handler)
    }, [tokenKey, setHasToken])
    
    return hasToken;
}