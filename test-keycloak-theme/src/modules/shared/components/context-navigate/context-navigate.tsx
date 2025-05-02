import type { FunctionComponent } from "react";
import { type To, Navigate } from "react-router-dom";

import { addContextToUrl } from "../../hooks/use-context-navigate";
import { useHrefBuilder } from "../../hooks/use-href";

export interface IContextNavigateProps {
    to: To,
    replace?: boolean,
    state?: unknown,
}

export const ContextNavigate: FunctionComponent<IContextNavigateProps> = ({
    to,
    replace,
    state
}) => {
    const hrefBuilder = useHrefBuilder();
    const link = addContextToUrl(to, hrefBuilder);

    return <Navigate to={link} replace={replace} state={state} />;
    
}

