import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false,
        },
    },
},);

interface MyAppProps {
    Component: React.ComponentType<any>;
    pageProps: any;
}

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </body>
        </html>
    )
}