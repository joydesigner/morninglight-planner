'use client';

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "./ApolloClient";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error }: { error: Error }) {
    return (
        <div role="alert" className="text-red-500">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
        </div>
    );
}

export default function ClientProvider({
                                           children,
                                           initialState = null,
                                       }: {
    children: React.ReactNode;
    initialState?: any;
}) {
    const apolloClient = useApollo(initialState);

    // Enable Apollo DevTools in development
    if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
        (window as any).__APOLLO_CLIENT__ = apolloClient;
    }

    console.log("Apollo Client initialized:", typeof window === "undefined" ? "SSR" : "Client");

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <ApolloProvider client={apolloClient}>
                {children}
            </ApolloProvider>
        </ErrorBoundary>
    );
}