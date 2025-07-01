import Navbar from "./Container/Navbar.tsx";
import Footer from "./Components/Footer/Footer.tsx";
import Dashboard from "./Pages/Dashboard.tsx";
import Product from './Components/Product/Product.tsx'
import Payment from './Components/Payment/Payment.tsx'


import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom"; // Import useLocation
import   { useEffect } from "react"; // Import useEffect;
import Home from "./Pages/Home.tsx";
import Login from "./Pages/login.tsx";
import Signup from "./Pages/signup.tsx";
import { ScrollProvider } from "./Context/ScrollContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  
  return null;
}




// Layout with Navbar and Footer
function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function DashboardLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
      <ScrollProvider>
        <ScrollToTop />
        <Routes>
          {/* Routes with Navbar */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          
          {/* Dashboard route without Navbar */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/product" element={<DashboardLayout />}>
            <Route index element={<Product />} />
          </Route>
          <Route path="/payment" element={<DashboardLayout />}>
            <Route index element={<Payment />} />
          </Route>
        </Routes>
      </ScrollProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;