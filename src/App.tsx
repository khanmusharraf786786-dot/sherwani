import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomizationChat from './components/CustomizationChat';
import Auth from './components/Auth';
import DesignerDashboard from './components/DesignerDashboard';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

function App() {
  const [session, setSession] = useState<any>(null);
  const [role, setRole] = useState<'user' | 'designer' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchRole(session.user.id);
      else setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchRole(session.user.id);
      else {
        setRole(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchRole = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    setRole(data?.role || 'user');
    setLoading(false);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!session) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {role === 'designer' ? (
        <DesignerDashboard />
      ) : (
        <>
          <Hero />
          <CustomizationChat />
          <Services />
          <Gallery />
          <Reviews />
          <Contact />
        </>
      )}

      <Footer />
    </div>
  );
}

export default App;
