import React from "react";

export function useEventListener(eventType, callback, options = {}) {
    const {
        target = document,
        dependencies = [],
        init = false
    } = options;
    
    React.useEffect(() => {
        target.addEventListener(eventType, callback);
        init && callback();
        
        return () => target.removeEventListener(eventType, callback);
    }, dependencies);
}