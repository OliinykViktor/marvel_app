import AppBanner from "../components/appBanner/AppBanner";
import ComicsList from "../components/comicsList/ComicsList";

// import { motion, AnimatePresence } from 'framer-motion';

const ComicsPage = () => {
    return (
        // <AnimatePresence >
        //     <motion.div
        //         initial={{ opacity: 0 }}
        //         animate={{ opacity: 1 }}
        //         exit={{ opacity: 0 }}
        //     >
            <>

                <AppBanner />
                <ComicsList />
            </>
            /* </motion.div>
        </AnimatePresence> */
    )
};

export default ComicsPage;