import React from 'react';
import Message from '../../messaging/Message';
import { GetOverlappingUrisReportData } from './GetOverlappingUrisReportData';

export async function OverlappingUrisReport () {
    const response = await GetOverlappingUrisReportData();

    if (response.length < 1) {
        return null;
    }

    return (
        <Message
            type="error"
            heading="There is an overlap in URIs"
            body={response.map((uri) => `${uri.uri}: ${uri.count}`)}
            padBottom
        />
    );
}
