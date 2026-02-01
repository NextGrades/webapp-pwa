// routes/__root.tsx
import {
  Outlet,
  createRootRouteWithContext,
  useMatches,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";

import type { QueryClient } from "@tanstack/react-query";
import { ModalProvider } from "@/context/ModalContext";
import Header from "@/components/Header";
import type { HeaderConfig } from "@/common/types/header";

declare module "@tanstack/react-router" {
  interface StaticDataRouteOption {
    header?: HeaderConfig;
    showHeader?: boolean;
  }
}

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    const matches = useMatches();
    const headerMatch = [...matches]
      .reverse()
      .find((match) => match.staticData?.header);
    const headerDivs: HeaderConfig | undefined =
      headerMatch?.staticData?.header;
    const showHeader = matches.some((m) => !m.staticData.showHeader === false);

    return (
      <>
        <ModalProvider>
          {showHeader && (
            <Header center={headerDivs?.center} right={headerDivs?.right} />
          )}
          <Outlet />

          <TanStackDevtools
            config={{ position: "bottom-right" }}
            plugins={[
              {
                name: "TanStack Router",
                render: <TanStackRouterDevtoolsPanel />,
              },
              TanStackQueryDevtools,
            ]}
          />
        </ModalProvider>
      </>
    );
  },
});
