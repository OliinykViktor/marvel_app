import React, { useState, FC } from "react";

import { motion } from 'framer-motion';

import RandomChar from "../components/randomChar/RandomChar";
import ErrorBoundary from "../components/ui/errorBoundary/ErrorBoundary";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";

import motionsParams from '../services/motionsParams';

import decoration from '../assets/img/vision.png';

const CharPage: FC = () => {

  const [selectChar, setSelect] = useState<number | null>(null)

  const onSelectedChar = (id: number) => {
    setSelect(id);
  }

  return (
    <motion.div{...motionsParams}>
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