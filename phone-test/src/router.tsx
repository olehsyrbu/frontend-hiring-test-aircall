import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { AuthProvider } from 'src/context/AuthContext';
import { AppRedirect } from 'src/AppRedirect';
import { ProtectedRoute } from 'src/components';
import { NotFoundPage, ErrorPage, LoginPage, CallsListPage, CallDetailsPage } from 'src/pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthProvider />} errorElement={<ErrorPage />}>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<AppRedirect />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/calls" element={<ProtectedRoute />}>
        <Route path="/calls" element={<CallsListPage />} />
        <Route path="/calls/:callId" element={<CallDetailsPage />} />
      </Route>
    </Route>
  )
);

export default router;
