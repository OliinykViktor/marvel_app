import { useState } from "react";

import RandomChar from "../components/randomChar/RandomChar";
import ErrorBoundary from "../components/ui/errorBoundary/ErrorBoundary";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";

import decoration from '../assets/img/vision.png';
import { TransitionGroup } from "react-transition-group";

// import { motion, AnimatePresence } from 'framer-motion';

const CharPage = () => {

  const [selectChar, setSelect] = useState(null)

  const onSelectedChar = (id) => {
    setSelect(id);
  }

  return (
    // <AnimatePresence >
    //   <motion.div
    //     initial={{ opacity: 0 }}
    //     animate={{ opacity: 1 }}
    //     exit={{ opacity: 0 }}
    //   >
      <>

        <RandomChar />
        <div className="char__content">
          <ErrorBoundary>
            <CharList onSelectedChar={onSelectedChar} />
          </ErrorBoundary>
          <CharInfo charId={selectChar} />
        </div>
        <img src={decoration} alt="decotarion" className="bg-decoration" />
      </>
    //   </motion.div>
    // </AnimatePresence>
  );
};

export default CharPage;