import axios from "axios";

import { Participant, participantsID } from "../interfaces/interfaces";



const getParticipantsIdName = async (): Promise<participantsID> => {
    const result = await axios.get("http://10.152.20.113:3002/participantsData");
    return result.data;
};

const getParticipants = async (): Promise<Participant[]> => {
    const result = await axios.get("http://10.152.20.113:3002/participantsData");
    return result.data;
};

const getParticipant = async (
    _name: string
): Promise<{ name: string; id: number }> => {
    const result = await axios.get(
        `http://10.152.20.113:3001/participants?name=${_name}`
    );
    return result.data[0];
};

export { getParticipantsIdName, getParticipants, getParticipant };
