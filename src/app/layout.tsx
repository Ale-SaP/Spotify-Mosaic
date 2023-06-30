import LeftMenu from '../components/general-use/leftMenu';
import './globals.css';

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
                <div className="flex bg-zinc-900">
                    <div className="w-1/4 mx-auto h-screen overflow-auto">
                        <LeftMenu/>
                    </div>
                    <div className="w-3/4 mx-auto h-screen overflow-auto">
                        <div className='justify-items-end justify-end'>
                            {children}
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}