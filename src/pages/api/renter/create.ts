import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST') {
        await prisma.renter.create({
            data: req.body
        });
        res.status(200).json({success: true})
    }
}