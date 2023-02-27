const ip = "http://localhost:";
const port = "3000";
const base = "/api/event";

const createEventUrl = ip+port+base+"/createEvent";
const findEventsUrl = ip + port + base + "/findEvents";

export {
    createEventUrl,
    findEventsUrl,
}