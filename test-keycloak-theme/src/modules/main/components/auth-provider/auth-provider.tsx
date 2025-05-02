import { memo, useMemo } from 'react';
import type { AuthProviderProps } from 'react-oidc-context';
import { AuthProvider as OIAuthProvider } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';

import { WebStorageStateStore } from 'oidc-client-ts';

import { config } from '../../../../config/config';
import type { FCWithChildren } from '../../../shared/utils/component.interface';
import { isInApp } from '../../util/is-app';

export const AuthProvider: FCWithChildren<unknown> = memo(({ children }) => {
    const { protocol, hostname, port, pathname } = window.location;
    const navigate = useNavigate();
    const redirectUri = `${protocol}//${hostname}${port ? `:${port}` : ''}${pathname}`;

    console.log(JSON.stringify(redirectUri, null, 2));

    const oidcConfig = useMemo(
        (): AuthProviderProps => ({
            authority: `${config.AUTH_ENDPOINT}realms/${config.KEYCLOAK_REALM}`,
            client_id:
                isInApp() && config.SPORTNCO_NATIVE_APP.IS_ENABLED
                    ? config.SPORTNCO_NATIVE_APP.KEYCLOAK_CLIENT_ID
                    : config.KEYCLOAK_CLIENT_ID,
            redirect_uri: `http://localhost:5173/`,
            scope: `openid ${config.TENANT_ID}`,
            userStore: new WebStorageStateStore({ store: window.localStorage }),
            onSigninCallback() {
                const searchParams = new URLSearchParams(window.location.search);

                searchParams.delete('state');
                searchParams.delete('session_state');
                searchParams.delete('code');

                navigate({
                    pathname: window.location.pathname,
                    search: searchParams.toString(),
                });
            },
            automaticSilentRenew: false,
            accessTokenExpiringNotificationTimeInSeconds: 30,
        }),
        [redirectUri, navigate],
    );

    return <OIAuthProvider {...oidcConfig}>{children}</OIAuthProvider>;
});
