import { Link, useLocation, useParams } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

/**
 * Dynamic Breadcrumbs component.
 * Automatically generates crumbs based on current route + optional overrides.
 * 
 * @param {Object} props
 * @param {Array} props.items - Override items: [{ label, to }]
 */
export default function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="breadcrumbs"
    >
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/" className="breadcrumbs__link breadcrumbs__link--home" aria-label="Beranda">
            <Home size={14} />
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="breadcrumbs__item">
              <ChevronRight size={12} className="breadcrumbs__separator" />
              {isLast ? (
                <span className="breadcrumbs__current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} className="breadcrumbs__link">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
