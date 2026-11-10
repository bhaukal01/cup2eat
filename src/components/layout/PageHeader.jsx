import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { TextReveal, EDITORIAL_EASE } from '../motion/MotionPrimitives';
import './layout.css';

export function PageHeader({ eyebrow, title, lead, currentPage }) {
  return (
    <section className="page-header">
      <div className="container">
        <motion.nav
          className="breadcrumb"
          aria-label="Breadcrumb"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.38, ease: EDITORIAL_EASE }}
        >
          <Link to="/">Home</Link>
          <ChevronRight size={13} aria-hidden="true" />
          <span aria-current="page">{currentPage || title}</span>
        </motion.nav>
        {eyebrow && (
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: EDITORIAL_EASE }}
          >
            {eyebrow}
          </motion.span>
        )}
        <TextReveal as="h1" className="page-header-title" delay={0.08} immediate>
          {title}
        </TextReveal>
        {lead && (
          <motion.p
            className="page-header-lead"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.14, ease: EDITORIAL_EASE }}
          >
            {lead}
          </motion.p>
        )}
      </div>
    </section>
  );
}

