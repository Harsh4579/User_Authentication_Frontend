import React from 'react';
import './Card.css';

const Card = ({ className, style, header, footer, children }) => {
    return (
        <div className={`card ${className}`} style={style}>
            {header && <div className="card-header">{header}</div>}
            <div className="card-content">{children}</div>
            {footer && <div className="card-footer">{footer}</div>}
        </div>
    );
};

export default Card;
