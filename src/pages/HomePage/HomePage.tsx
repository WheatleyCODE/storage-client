/* eslint-disable max-len */
import React, { FC, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Element, scroller } from 'react-scroll';
import { useLocation, useNavigate } from 'react-router';
import { BsChevronDoubleDown } from 'react-icons/bs';
import { Button } from 'components';
import { PathRoutes } from 'types';
import './HomePage.scss';

export const HomePage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToLogin = useCallback(() => navigate(PathRoutes.LOGIN), [navigate]);
  const navigateToRegister = useCallback(() => navigate(PathRoutes.REGISTER), [navigate]);

  useEffect(() => {
    if (location.hash) {
      scroller.scrollTo(location.hash, {
        saveHashHistory: true,
        hashSpy: true,
        spy: true,
        smooth: true,
        duration: 350,
      });
    }
  }, []);

  return (
    <div className="home-page">
      <Element name={PathRoutes.HOME_REVIEW} className="home-page__block block">
        <motion.div
          animate={{ translateY: 20 }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
          className="block__anhor"
        >
          <BsChevronDoubleDown />
        </motion.div>
        <div className="block__width">
          <motion.h2
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="block__title"
          >
            STORAGE PROJECT
          </motion.h2>
          <div className="content reverse">
            <div className="content__section image">
              <motion.img
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="content__image"
                src="https://lh3.googleusercontent.com/6MmVl3TEiBeEJCFIIfzO5DIgengYGPCdhEe8M6lXA6_Eh_xsKHDL_K4CLC31dETfiCue1hFOEf30IkIqlbOStvTfYbY_G85oEtJHQqjgz6OSXco8Aw=w0-l80-sg-rj-c0xffffff"
                alt="storage"
              />
            </div>
            <div className="content__section text">
              <motion.h2
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="content__title"
              >
                STORAGE PROJECT
              </motion.h2>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="content__info"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis magni reiciendis
                quisquam hic. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
                magni reiciendis quisquam hic.
              </motion.div>
              <motion.div
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="content__buttons buttons"
              >
                <Button
                  onClick={navigateToRegister}
                  className="buttons__big"
                  outline="fill"
                  color="blue"
                  text="Попробовать"
                />
                <Button onClick={navigateToLogin} className="buttons__small" text="Войти" />
              </motion.div>
            </div>
          </div>
        </div>
        <div className="block__hr">
          <hr />
        </div>
      </Element>
      <Element name={PathRoutes.HOME_FEATURES} className="home-page__block block">
        <div className="block__width">
          <motion.h2
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="block__title mobile"
          >
            Возможности
          </motion.h2>
          <div className="content">
            <div className="content__section image">
              <motion.img
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="content__image"
                src="https://lh3.googleusercontent.com/KmMK86vU4Q4_etBMCy-VI7O9D08C-xqdXYFxjdxvAKXhLk8AUDcgwCV27ykWNu3H4gCf8QNLEYCJcSQsUjMD0qr6KgF0AbZywYS2kQGcW7p9lipDa4_q=w0-l80-sg-rj-c0xffffff"
                alt="storage"
              />
            </div>
            <div className="content__section text">
              <motion.h2
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="content__title"
              >
                Возможности
              </motion.h2>
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="content__info"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis magni reiciendis
                quisquam hic. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
                magni reiciendis quisquam hic.
              </motion.div>
            </div>
          </div>
        </div>
        <div className="block__hr">
          <hr />
        </div>
      </Element>
      <Element name={PathRoutes.HOME_MORE} className="home-page__block block">
        <div className="block__width">
          <motion.h2
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="block__title mobile"
          >
            Больше
          </motion.h2>
          <div className="content reverse">
            <div className="content__section image">
              <motion.img
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="content__image"
                src="https://lh3.googleusercontent.com/yCtJQGVMT5x-OVFBA4pAG3aUkGM5-KOl9Nb8w5Ah0ipsKP4Vupp0yRyWGOaQOx4ey5FsSxQLh8_KqMViHegT9uHmhb0elqAjXW27UU8zsQmC57wMRQ=w0-l80-sg-rj-c0xffffff"
                alt="storage"
              />
            </div>
            <div className="content__section text">
              <motion.h2
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="content__title"
              >
                Больше
              </motion.h2>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="content__info"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis magni reiciendis
                quisquam hic. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
                magni reiciendis quisquam hic.
              </motion.div>
            </div>
          </div>
        </div>
        <div className="block__hr">
          <hr />
        </div>
      </Element>
    </div>
  );
};
