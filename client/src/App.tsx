import React from 'react';
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";

const routerHOC = (WrappedComponent: React.ComponentType) => (props: any) => {
  // const [originalUrl, setOriginalUrl] = React.useState<string | null>(window.location.pathname);
  // const hasToken = useTokenStatus(TokenManager.KEY);
  // const navigate = useNavigate();

  // React.useEffect(() => {
  //   const noToken = () => navigate("/sign-in");
  //   const token = () => {
  //     const current = window.location.pathname;
  //     if (current.startsWith("/app")) {
  //       if (originalUrl !== null) setOriginalUrl(null);
  //       return;
  //     }
  //     let nextUrl = "/app";
  //     if (originalUrl !== null) {
  //       nextUrl = originalUrl.startsWith("/app") ? originalUrl : "/app";
  //       setOriginalUrl(null);
  //     }
  //     if (current === nextUrl) return;
  //     navigate(nextUrl);
  //   };
  //   hasToken ? token() : noToken();
  // }, [hasToken, navigate, originalUrl, setOriginalUrl]);

  return <WrappedComponent {...props} />;
};

const AppRouter = routerHOC(() => (
  <Routes>
    <Route path="/app" element={<div>lalala home page</div>} />

    {/* 
    <Route path="/app" element={<AppShell />}>
      <Route index element={<Navigate to="/app/devices" />} />
      <Route path="devices" element={<Outlet />}>
      <Route index element={<Devices />} />
      <Route path=":hwId" element={<Device />} />
      <Route path="add-device" element={<AddDevice />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route> 
    <Route path="/sign-in" element={<SignIn />} />
    */}
  </Routes>
));

export default function App() {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}
  