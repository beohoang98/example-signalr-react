import {SignalRProvider} from "./core/signalr/SignalRProvider";
import {AuthProvider} from "./core/auth/AuthProvider";
import {ChatPage} from "./features/chat/Chat";

function App() {
  return (
      <AuthProvider>
          <SignalRProvider>
              <ChatPage />
          </SignalRProvider>
      </AuthProvider>
  );
}

export default App;
