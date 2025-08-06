import { useState } from "react";
import useAuth from "./hooks/useAuth";

const App = () => {
  const [email, setEmail] = useState("");

  const { session, signInWithEmail, signOut } = useAuth();

  const handleSignIn = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    signInWithEmail(email);
  };

  return (
    <div className="bg-red-100 min-h-screen flex justify-center items-center">
      {session ? (
        <>
          <div>✅ 로그인 됨: {session.user.email}</div>
          <button
            onClick={signOut}
            className="px-4 py-1 bg-red-500 text-white rounded"
          >
            로그아웃
          </button>
        </>
      ) : (
        <>
          <form onSubmit={handleSignIn}>
            <input
              className="border px-2 py-1 mr-2 rounded"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="px-4 py-1 bg-blue-500 text-white rounded"
              type="submit"
            >
              이메일 로그인 링크 전송
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default App;