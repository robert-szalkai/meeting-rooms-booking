import axios from "axios";

import { Participant, participantsID } from "../interfaces/interfaces";

const getParticipantsIdName = async (): Promise<participantsID> => {
    const result = await axios.get("http://localhost:3002/participantsData");
    return result.data;
};

const getParticipants = async (): Promise<Participant[]> => {
    const result = await axios.get(
        "http://localhost:4000/msgraph/participants/RO"
    );
    return result.data.value;
};

const getParticipant = async (_name: string): Promise<Participant> => {
    const result = await axios.get(
        `http://localhost:4000/msgraph/participant/${_name}`
    );
    return result.data.value[0];
};

export { getParticipantsIdName, getParticipants, getParticipant };
