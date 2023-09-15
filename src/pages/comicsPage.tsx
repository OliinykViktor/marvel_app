import React, { FC } from "react";
import AppBanner from "../components/appBanner/AppBanner";
import ComicsList from "../components/comicsList/ComicsList";
import motionParams from "../services/motionsParams";

import { motion } from 'framer-motion';
import useMetaData from "../hooks/metadata";

const ComicsPage: FC = () => {

    const metadata = useMetaData({
        title:"Marvel's comics shop",
        content:"The Marvel Comics Store, where you can search and add comics featuring Marvel characters to your order."
    })
    return (
        <motion.div {...motionParams}>
            {metadata}
            <AppBanner />
            <ComicsList />
        </motion.div>
    )
};

export default ComicsPage;