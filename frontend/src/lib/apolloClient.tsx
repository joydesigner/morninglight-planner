import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject } from "@apollo/client";
import { useMemo } from "react";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
        });
    }
    if (networkError) {
        console.error(`[Network error]: ${networkError}`);
    }
});

// Function to create a new Apollo Client instance
function createApolloClient(): ApolloClient<NormalizedCacheObject> {
    return new ApolloClient({
        ssrMode: typeof window === "undefined", // Enable support for SSR
        link: errorLink.concat(
            new HttpLink({
                uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4000/graphql",
                credentials: "same-origin",
            })
        ),
        cache: new InMemoryCache(),
    });
}

// Apollo Client instance for reuse
let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

// Function to initialize Apollo Client
export function initializeApollo(initialState: NormalizedCacheObject | null = null): ApolloClient<NormalizedCacheObject> {
    const _apolloClient = apolloClient ?? createApolloClient();

    // Hydrate the cache with initial state if provided
    if (initialState) {
        _apolloClient.cache.restore(initialState);
    }

    // For SSG and SSR, always create a new Apollo Client instance
    if (typeof window === "undefined") return _apolloClient;

    // On the client, reuse Apollo Client instance
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

// Hook to use Apollo Client in React components
export function useApollo(initialState: NormalizedCacheObject | null): ApolloClient<NormalizedCacheObject> {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);
    return store;
}