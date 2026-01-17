import { apiFetch } from "../client";

interface SupportRequest {
    email: string;
    text: string;
}

interface SupportResponse {
    email: string;
    text: string;
}

export const SendSupport = async (data: SupportRequest) : Promise<SupportResponse> => {
    return apiFetch<SupportResponse>("/api/v1/service/message/",{method: 'POST', body: JSON.stringify(data)})
}