"use client";

import { NotificationsToggler } from "@widgets/notificationsToggler";
import { useState } from "react";

export default function Home() {
  const [active, setActive] = useState<boolean>(true);

  return (
    <main>
      <NotificationsToggler
        active={active}
        onClick={() => setActive((prev) => !prev)}
      />
    </main>
  );
}
