
import Footer from "../View/Footer";

export default function aboutLayout({ children }) {

    return (
        <div>
            <hr />
            {children}
            <Footer />
        </div>

    );
}