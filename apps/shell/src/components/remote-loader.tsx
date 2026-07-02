import { useEffect, useState } from "react";

const remoteMap = {
  customers: () => import("customers/customers"),
  products: () => import("products/products"),
  dashboard: () => import("dashboard/dashboard"),
};

type Props = {
  remote: string;
};

export function RemoteLoader({ remote }: Props) {
  const [Component, setComponent] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setError(false);
        setComponent(null);

        const module = await remoteMap[remote as keyof typeof remoteMap]();

        if (active) {
          setComponent(() => module.default);
        }
      } catch {
        if (active) {
          setError(true);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [remote]);

  if (error) {
    return <div className="p-8">MFE não disponível no momento</div>;
  }

  if (!Component) {
    return <p>Loading...</p>;
  }

  return <Component />;
}
