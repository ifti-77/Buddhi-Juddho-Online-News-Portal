
import Footer from "../View/Footer";

export default function termsConditionLayout({ children }) {

    return (
        <div>
            <hr />
            {children}
            <Footer />
        </div>

    );
}