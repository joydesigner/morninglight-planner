'use client';

import { ApolloProvider } from "@apollo/client"; // Correctly imported as a component
import { useApollo } from "./apolloClient";

export default function ClientProvider({ children }: { children: React.ReactNode }) {
    const apolloClient = useApollo(null);

    return (
        <ApolloProvider client={apolloClient}>
            {children}
        </ApolloProvider>
    );
}