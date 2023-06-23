import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';

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
                    {children}
            </body>
        </html>
    )
}