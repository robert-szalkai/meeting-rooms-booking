import { Dayjs } from "dayjs";

export  interface iRoomCards{
    name:string,
    availability:0|1|2;
    description:string;
    capacity:number;
    id:number;
}
export interface MeetingRoomsData {
    title: string;
    id: number;
    description: string;
    lastBooked: string;
    capacity: number;
    meetings:{
        startDate:string;
        endDate:string;
        
    }[]
}
export interface Participant {
    name: string;
    id: number;
    available: boolean;
    image: string;
}

export interface Meeting {
    meetingName: string;
    meetingDescription: string;
    startDate: string;
    endDate: string;
    participants: number[];
    id: number;
}

export interface FormValidity {
    isNameValid: boolean;
    isDateValid: boolean;
    isStartValid: boolean;
    isEndValid: boolean;
    isOwnerValid: boolean;
}

export interface ParticipantsProps {
    meetingParticipants: Participant[];
    allEmployees: Participant[];
    meetingOwner: Participant[];
    handleMeetingParticipants: (values: any) => void;
    handleMeetingOwner: (values: any) => void;
    fieldTextValid: ParticipantsValid;
    formValidationOwnerSetter: (values: boolean, key: string) => void;
}

export interface ParticipantsValid {
    meetingOwnerValid: Participant[];
}

export interface InputFieldProps {
    inputLabelText: string;
    placeholderText: string;
    multilineSelect?: boolean;
    handleMeetingName: (values: string) => void;
    handleMeetingDescription: (values: string) => void;
    fieldTextValid?: string;
    formValidationSetter: (values: boolean, key: string) => void;
}

export interface DateSelectorProps {
    handleMeetingDate: (values: any) => void;
    handleStartTime: (values: any) => void;
    handleEndTime: (values: any) => void;
    fieldTextValid: dateSelectorValid;
    formValidationDateSetter: (values: boolean, key: string) => void;
    formValidationStartSetter: (values: boolean, key: string) => void;
    formValidationEndSetter: (values: boolean, key: string) => void;
    bookedMeetings: any;
}

export interface SelectHour {
    val: Dayjs;
    text: string;
    isdisabled: boolean;
}

export interface MeetingDate {
    startDate: Dayjs;
    endDate: Dayjs;
}

export interface dateSelectorValid {
    dateValid: string;
    startValid: string;
    endValid: string;
}