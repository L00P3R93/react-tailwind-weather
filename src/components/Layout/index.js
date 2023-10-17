import { SegmentsNav, SegmentsNavLg } from '../Segments';

const Layout = ({ children }) => {
    return (
        <>
            <SegmentsNavLg />
            {children}
            <footer>
                <SegmentsNav />
            </footer>
        </>
    )
}

export default Layout;