import { Response } from "express";

export function apiResponseOk(data, res:Response)
{
    res.send({data,"status":200});
}

export function apiResponseBad(data, res:Response)
{
    res.send({data,"status":500}).status(400);
}