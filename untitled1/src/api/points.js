import useSWR, { mutate } from 'swr';
import {fetcher} from "./fetcher";

export function usePoints() {
    const { data, error, mutate } = useSWR('http://localhost:8080/api/api/points', fetcher, {
        revalidateOnFocus: true,
        shouldRetryOnError: true,
    });

    return {
        points: data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
}

export async function sendPoint(point) {
    await fetcher('http://localhost:8080/api/api/points/check', {
        method: 'POST',
        body: JSON.stringify(point),
    });
    mutate('http://localhost:8080/api/api/points');
}
