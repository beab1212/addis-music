import { lazy } from "react";

// Not integrated yet due to import problem
export function lazyLoad(path, namedExport) {    
    return lazy(() => {
        const promise = import(path)
        if (namedExport == null) {
            return promise
        } else {
            return promise.then(module => ({ default: module[namedExport] }))
        }
    })
}
