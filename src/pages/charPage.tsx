import React, { useState, FC } from "react";
import { motion } from 'framer-motion';

import Metadata from "../utils/metadata";
import motionsParams from '../services/motionsParams';

import RandomChar from "../components/randomChar/RandomChar";
import ErrorBoundary from "../components/ui/errorBoundary/ErrorBoundary";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";

import decoration from '../assets/img/vision.png';

const CharPage: FC = () => {

  const [selectChar, setSelect] = useState<number | null>(null)

  const onSelectedChar: (id: number) => void = (id) => {
    setSelect(id);
  }
  const metadata = Metadata({
    title: "Marvel information portal",
    content: "Marvel's information portal where you can search and explore Marvel characters."
  })

  return (
    <motion.div {...motionsParams}>
      {metadata}
      <RandomChar />
      <div className="char__content">
        <ErrorBoundary>
          <CharList onSelectedChar={onSelectedChar} />
        </ErrorBoundary>
        <div style={{
          position: 'sticky',
          top: '25px'
        }}>
          <CharInfo charId={selectChar} />
        </div>
      </div>
      <img src={decoration}
        alt="decotarion"
        className="bg-decoration" />
    </motion.div>
  );
};

export default CharPage;