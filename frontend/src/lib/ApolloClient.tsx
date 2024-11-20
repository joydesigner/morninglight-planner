import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject } from "@apollo/client";
import { useMemo } from "react";
import { onError } from "@apollo/client/link/error";

const GRAPHQL_URI = process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4000/graphql";

if (!process.env.NEXT_PUBLIC_GRAPHQL_URL && process.env.NODE_ENV === "production") {
    console.warn("Warning: NEXT_PUBLIC_GRAPHQL_URL is not set in production!");
}

// Error handling for Apollo Client
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
        });
    }
    if (networkError) {
        console.error(`[Network error]: ${networkError.message}`);
    }
});

// Cache configuration with type policies
const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                items: {
                    keyArgs: false, // Combine paginated results into a single list
                    merge(existing = [], incoming) {
                        return [...existing, ...incoming];
                    },
                },
            },
        },
    },
});

// Function to create a new Apollo Client instance
function createApolloClient(): ApolloClient<NormalizedCacheObject> {
    return new ApolloClient({
        ssrMode: typeof window === "undefined", // Enable SSR support
        link: errorLink.concat(
            new HttpLink({
                uri: GRAPHQL_URI,
                credentials: "same-origin",
            })
        ),
        cache,
        connectToDevTools: process.env.NODE_ENV === "development",
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

// import { ApolloClient, InMemoryCache } from "@apollo/client";
//
// const client = new ApolloClient({
//     uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4000/graphql",
//     cache: new InMemoryCache(),
// });
//
// export default client;