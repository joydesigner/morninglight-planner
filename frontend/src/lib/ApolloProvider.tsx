import { ApolloProvider } from "@apollo/client";
import { useApollo } from "./ApolloClient";

const CustomApolloProvider = ({ children }: { children: React.ReactNode }) => {
    const apolloClient = useApollo(null);

    return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default CustomApolloProvider;