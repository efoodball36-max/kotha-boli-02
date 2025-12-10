import { useAuth } from './context/AuthContext.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';

export default function App({ apiBase }) {
  const { user } = useAuth();
  return user ? <Home apiBase={apiBase} /> : <Login />;
<<<<<<< HEAD
}
=======
}
>>>>>>> 3aaa7999a940efd5c5b86ed820ed4c00b034c7a4
