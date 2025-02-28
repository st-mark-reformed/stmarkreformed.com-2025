// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable indent */
import React from 'react';

export default function Loader (
    {
        size = 4,
    }: {
        size?: number;
    },
) {
    const classes = [
        'loader',
        'ease-linear',
        'rounded-full',
        'border-gray-200',
        'border-gray-200',
        'inline-block',
        'align-middle',
    ];

    switch (size) {
        case 1:
            classes.push('h-1', 'w-1');
            break;
        case 2:
            classes.push('h-2', 'w-2');
            break;
        case 3:
            classes.push('h-3', 'w-3');
            break;
        case 4:
            classes.push('h-4', 'w-4');
            break;
        case 5:
            classes.push('h-5', 'w-5');
            break;
        case 6:
            classes.push('h-6', 'w-6');
            break;
        case 7:
            classes.push('h-7', 'w-7');
            break;
        case 8:
            classes.push('h-8', 'w-8');
            break;
        case 9:
            classes.push('h-9', 'w-9');
            break;
        case 10:
            classes.push('h-10', 'w-10');
            break;
        default:
            classes.push('h-4', 'w-4');
    }

    if (size < 7) {
        classes.push('border-2');
    } else {
        classes.push('border-4');
    }

    return <div className={classes.join(' ')} />;
}
