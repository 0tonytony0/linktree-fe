import { Route } from "react-router-dom";
import { isAuthenticated } from "../utils/constants";
import Layout from "../layouts/Layout";

 export const ProtectedRoutes = () => {
  return isAuthenticated() ? (
    <Layout>
      <Outlet /> {/* This will render nested routes */}
    </Layout>
  ) : (
    <Navigate to="/403" replace />
  );
};

// export const ProtectedRoutes = () => {
//   return (
//     <Routes>
//       {PrivateRoutes.map((route) =>
//         isAuthenticated() ? (
//           <Route key={route.path} path={route.path} element={route.element} />
//         ) : (
//           <Route
//             key={route.path}
//             path={route.path}
//             element={<Navigate to="/" replace />}
//           />
//         )
//       )}
//     </Routes>
//   );
// };

