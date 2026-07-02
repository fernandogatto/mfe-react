import React, { useState } from "react";

import { Header } from "./components/layout/header";
import { Sidebar } from "./components/layout/sidebar";
import { RemoteLoader } from "./components/remote-loader";

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="flex">
      <Sidebar page={page} setPage={setPage} />

      <div className="flex-1">
        <Header />

        <main>
          <RemoteLoader remote={page} />
        </main>
      </div>
    </div>
  );
}

export default App;
