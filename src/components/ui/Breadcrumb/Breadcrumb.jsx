import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumb.css';

export const Breadcrumb = ({ 
  items = [], 
  separator = '›', 
  showHome = true,
  className = '',
  maxItems = null 
}) => {
  // Adicionar item Home se showHome for true e não existir
  const breadcrumbItems = showHome && items.length > 0 && items[0].href !== '/' 
    ? [{ label: 'Início', href: '/', icon: '🏠' }, ...items]
    : items;

  // Limitar número de itens se maxItems for especificado
  const displayItems = maxItems && breadcrumbItems.length > maxItems
    ? [
        breadcrumbItems[0],
        { label: '...', href: null, isEllipsis: true },
        ...breadcrumbItems.slice(-maxItems + 2)
      ]
    : breadcrumbItems;

  if (displayItems.length === 0) {
    return null;
  }

  return (
    <nav 
      className={`breadcrumb ${className}`}
      aria-label="Navegação estrutural"
    >
      <ol className="breadcrumb__list">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isEllipsis = item.isEllipsis;

          return (
            <li 
              key={index} 
              className={`breadcrumb__item ${
                isLast ? 'breadcrumb__item--active' : ''
              } ${isEllipsis ? 'breadcrumb__item--ellipsis' : ''}`}
            >
              {/* Separador */}
              {index > 0 && (
                <span className="breadcrumb__separator" aria-hidden="true">
                  {separator}
                </span>
              )}

              {/* Item do breadcrumb */}
              {isEllipsis ? (
                <span className="breadcrumb__ellipsis">{item.label}</span>
              ) : isLast || !item.href ? (
                <span 
                  className="breadcrumb__text"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.icon && (
                    <span className="breadcrumb__icon" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  <span className="breadcrumb__label">{item.label}</span>
                </span>
              ) : (
                <Link 
                  to={item.href} 
                  className="breadcrumb__link"
                  title={`Ir para ${item.label}`}
                >
                  {item.icon && (
                    <span className="breadcrumb__icon" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  <span className="breadcrumb__label">{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>

      {/* Schema.org structured data */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbItems
              .filter(item => !item.isEllipsis && item.href)
              .map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": item.label,
                "item": typeof window !== 'undefined' ? window.location.origin + item.href : item.href
              }))
          })
        }}
      />
    </nav>
  );
};

// Export default
export default Breadcrumb;