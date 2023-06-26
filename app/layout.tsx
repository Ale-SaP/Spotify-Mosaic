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
                <div className="flex">
                    <div className="w-2/6 w-full mx-auto">
                    </div>
                    <div className="w-4/6 w-full mx-auto">
                        <div className='justify-items-end justify-end'>
                            {children}
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}