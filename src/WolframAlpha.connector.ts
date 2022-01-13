import {WAQueryResponse} from "./Models";

export async function queryWolframAlpha(category: string, year: number): Promise<string> {
    const queryParams = ['appid=7E34XY-YUPTQPH3YV', `input=${encodeURIComponent(`oscars ${category} nominees ${year}`)}`, 'output=json', 'format=plaintext'];
    const url = `http://api.wolframalpha.com/v1/query?${queryParams.join('&')}`;
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
    const data = await response.json()
    const queryResponse = JSON.parse(data.contents) as WAQueryResponse

    const answerPod = queryResponse.queryresult.pods.find(pod => pod.id === 'Result');
    if (!answerPod) return 'Could not parse Wolfram Alpha results';

    if (!answerPod.subpods.length) return 'No Wolfram Alpha results returned';
    return answerPod.subpods[0].plaintext;
}
