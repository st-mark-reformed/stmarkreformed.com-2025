'use server';

import RequestMethods from 'rxante-oauth/dist/Request/RequestMethods';
import { FormValues } from './ContentContactFormType';
import { RequestFactory } from '../../../../api/request/RequestFactory';

type Response = {
    success: boolean;
    messages: string[];
};

export default async function PostContactForm (
    payload: FormValues,
): Promise<Response> {
    const response = await RequestFactory().makeWithoutToken({
        uri: '/contact-form',
        method: RequestMethods.POST,
        payload,
    });

    return response.json as Response;
}
