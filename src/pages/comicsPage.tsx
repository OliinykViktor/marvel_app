import React, { FC } from "react";
import AppBanner from "../components/appBanner/AppBanner";
import ComicsList from "../components/comicsList/ComicsList";
import motionParams from "../services/motionsParams";

import { motion } from 'framer-motion';

const ComicsPage: FC = () => {
    return (
        <motion.div {...motionParams}>
            <AppBanner />
            <ComicsList />
        </motion.div>
    )
};

export default ComicsPage;