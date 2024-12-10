// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-var,vars-on-top */
// noinspection ES6ConvertVarToLetConst

import pino from 'pino';
import Redis from 'ioredis';

declare global {
    var redisClient: Redis | null;
}
