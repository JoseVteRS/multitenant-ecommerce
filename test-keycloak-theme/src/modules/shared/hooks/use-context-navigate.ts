import { useCallback } from 'react';
import { useNavigate, type NavigateOptions, type To } from 'react-router-dom';

import { useHrefBuilder } from './use-href';

export function useContextNavigate() {
    const navigate = useNavigate();
    const hrefBuilder = useHrefBuilder();

    return useCallback(
        (to: To, params?: NavigateOptions) => {
            navigate(addContextToUrl(to, hrefBuilder), params);
        },
        [navigate, hrefBuilder],
    );
}

export function addContextToUrl(to: To, hrefBuilder: (to: string) => string) {
    if (typeof to === 'string') {
        return hrefBuilder(to);
    }

    if (!to.pathname) {
        return to;
    }

    return {
        ...to,
        pathname: hrefBuilder(to.pathname),
    };
}