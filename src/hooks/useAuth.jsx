import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const useAuth = () => {
  const [session, setSession] = useState(null);

  const signInWithEmail = async (email) => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      alert("로그인 이메일 전송 실패:", error.message);
    } else {
      alert("✅ 로그인 링크가 이메일로 전송되었습니다.");
    }
  };

  const signOut = () => supabase.auth.signOut();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  return { session, signInWithEmail, signOut };
};

export default useAuth;