import "dotenv/config";
import { ScreepsAPI } from "screeps-api";
import { CronJob } from 'cron';
import logger from "./logger.js";
import axios from "axios";

// Is segment or memory
const isMemoryPath = process.env.SCREEPS_MEMORY_PATH !== undefined && process.env.SCREEPS_MEMORY_PATH.length > 0;
const isMMO = process.env.SCREEPS_TOKEN !== undefined && process.env.SCREEPS_TOKEN.length > 0;

console.log(`Getting data from ${isMemoryPath ? 'memory path' : 'segment'}`);
console.log(`Using ${isMMO ? 'MMO' : 'private'} API`);
console.log(`Using ${process.env.CRON_EXPRESSION} for cron expression`);

const api = new ScreepsAPI({
    token: isMMO ? process.env.SCREEPS_TOKEN : undefined,
    protocol: isMMO ? 'https' : process.env.SCREEPS_PRIVATE_PROTOCOL,
    hostname: isMMO ? 'screeps.com' : process.env.SCREEPS_PRIVATE_HOST,
    port: isMMO ? 443 : process.env.SCREEPS_PRIVATE_PORT,
    path: !isMMO ? '/' : process.env.SCREEPS_PATH,
});
if (process.env.SCREEPS_PRIVATE_USERNAME) await api.auth(process.env.SCREEPS_PRIVATE_USERNAME, process.env.SCREEPS_PRIVATE_PASSWORD);

new CronJob(
    process.env.CRON_EXPRESSION,
    async () => {
        logger.info("Starting cron job")

        try {
            const response = !isMemoryPath ? await api.memory.segment.get(process.env.SCREEPS_MEMORY_SEGMENT, process.env.SCREEPS_SHARD) : await api.memory.get(process.env.SCREEPS_MEMORY_PATH || '', process.env.SCREEPS_SHARD);
            await axios.put("https://api.pandascreeps.com/api/data", { data: {[process.env.DATA_PREFIX] : response.data}, token: process.env.HOSTED_API_KEY });
            logger.info("Cron job finished and data sent to API")
        } catch (error) {
            if (error.response) {
                logger.error("Cron job failed", error.response.data)
            }
            else logger.error("Cron job failed", error)
        }
    },
    null,
    true,
);