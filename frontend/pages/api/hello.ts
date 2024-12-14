import { NextApiRequest, NextApiResponse } from 'next';

let storedToken: string | null = null;

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    if(req.method === 'POST') {
        const jsonBody = JSON.parse(req.body);
        if(jsonBody.token) {
            storedToken = jsonBody.token;
        }     
    }
    
    res.status(200).json({ authorization : storedToken });
}