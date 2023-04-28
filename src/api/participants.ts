import axios from "axios";

import { Participant, participantsID } from "../interfaces/interfaces";

const getParticipantsIdName = async (
    status: number
): Promise<participantsID> => {
    const result = await axios.get("http://localhost:3002/participantsData");
    status = result.status;
    return result.data;
};

const getParticipants = async (): Promise<Participant[]> => {
    const result = await axios.get("http://localhost:3001/participants");
    return result.data;
};

const getParticipant = async (
    _name: string
): Promise<{ name: string; id: number }> => {
    const result = await axios.get(
        `http://localhost:3001/participants?name=${_name}`
    );
    return result.data[0];
};

export { getParticipantsIdName, getParticipants, getParticipant };
