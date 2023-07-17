import NavBar from '../../../components/general-use/navBar';
import '../../globals.css'

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
                <div className="bg-zinc-900">
                    <NavBar />
                    <div className="flex justify-items-center justify-center">
                        <div className='w-1/4'>
                            <div>aaa</div>
                        </div>
                        <div className='w-3/4'>
                            <div className='overflow-auto bg-black'>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}