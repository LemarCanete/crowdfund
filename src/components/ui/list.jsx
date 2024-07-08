import React from 'react';

export const List = ({ children, className }) => {
    return (
        <ul className={`list-disc pl-5 ${className}`}>
            {children}
        </ul>
    );
};

export const ListItem = ({ children, className }) => {
    return (
        <li className={`mb-2 ${className}`}>
            {children}
        </li>
    );
};
