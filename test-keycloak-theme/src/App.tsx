import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import "./App.css";

function App() {
  const auth = useAuth();

  const handleSignIn = async () => {
    const data = await auth.signinRedirect();
  };

  const handleSignOut = async () => {
    await auth.signoutSilent();
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      document.cookie = `auth-token=${auth.user?.access_token}`;
    }
  }, [auth.isAuthenticated]);

  return (
    <>
      <div className="card">
        {auth.isAuthenticated ? (
          <button onClick={handleSignOut}>Sign out</button>
        ) : (
          <button onClick={handleSignIn}>Sign in</button>
        )}
      </div>
    </>
  );
}

export default App;
