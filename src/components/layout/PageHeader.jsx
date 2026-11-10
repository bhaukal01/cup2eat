import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './layout.css';

export function PageHeader({ eyebrow, title, lead, currentPage }) {
  return (
    <section className="page-header">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={13} aria-hidden="true" />
          <span aria-current="page">{currentPage || title}</span>
        </nav>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="page-header-title">{title}</h1>
        {lead && <p className="page-header-lead">{lead}</p>}
      </div>
    </section>
  );
}

