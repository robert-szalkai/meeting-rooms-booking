import { Dayjs } from "dayjs";

export interface iHeader {
    handleClickForm: () => void;
    handleLogoutModal: () => void;
}

export interface iQuickBook {
    isDurationOpen?: boolean;
    handleQuickBookDone: () => void;
    availability: number;
}

export interface iQuickBookGlobal {
    onClickQuickBookGlobal: () => void;
}

export interface iRoomCards {
    name: string | undefined;
    availability: 0 | 1 | 2;
    description: string | undefined;
    capacity: number | undefined;
    id: string | undefined;
}

export interface iMenu {
    roomId: string;
    roomName: string;
    roomStatus: number;
    handleQuickBookDone: () => void;
    isDurationOpen?: boolean;
    availability: number;
}

export interface iLeftSide {
    displayName: string | undefined;
    meetings: Meeting[];
    availability: number;
    selectedCardId: string;
    onClickQuickBookGlobal: () => void;
}

export interface iMeetingData {
    subject: string;
    id: string;
    start: { dateTime: string, timeZone: string };
    end: { dateTime: string, timeZone: string };
    attendees: { emailAddress:{name:string, address:string} }[];
    body: {contentType:string, content:string};
}

export interface iMeetingInfo {
    setSelectedCardId: (meetid: string) => void;
}

export interface iMeetigroomForm {
    handleSubmit: (
        Name: string | undefined,
        Description: string | undefined,
        Capacity: string | undefined,
        id?: string
    ) => Promise<void>;
    text: String;
    edit: boolean;
    editData?: editData;
    onClose: () => void;
}
type editData = Pick<
    MeetingRoomsData,
    "description" | "displayName" | "capacity" | "id"
>;

export interface iCard {
    handleEdit: (id: string) => Promise<void>;
    title: string | undefined;
    id: string | undefined;
    description: string | undefined;
    lastBooked: string | undefined;
    capacity: number | undefined;
    handleDelete: (id: string) => void;
}

export interface iUpcomingCards {
    id: string;
    startDate: string;
    endDate: string;
    persons: (string | undefined)[];
    meetingName: string;
    selectedCardId?: string;
}

export interface iAdvancedBook {
    availability: number;
}

export interface MeetingRoomsData {
    displayName: string | undefined;
    description: string | undefined;
    capacity: string | undefined;
    id?: string;
    lastBooked?: string;
    meetings?: iMeetingData[];
    handleEdit?: () => Promise<void>;
    handleDelete?: () => void;
}
export interface Participant {
    displayName: string;
    givenName: string;
    mail: string;
    surname: string;
    id: string;
}

export interface participantsID {
    participants: {
        id: string;
        name: string;
    }[];
}

export interface INITIALOWNER {
    name: string;
    id: number;
}

export interface Meeting {
    subject: string;
    body: {contentType: string, content:string};
    start: { dateTime: string, timeZone:string };
    end: { dateTime: string,timeZone:string };
    attendees: {emailAddress:{name:string,address:string}}[];
    id: string;
}

export interface FormValidity {
    isNameValid: boolean;
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


export interface iQuickBookGlobal {
    onClickQuickBookGlobal: () => void;
}

export interface UserInfo{
    username:string;
    password:string;
    userType:string;
}

export interface ConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
};

export interface ModalProps {
    openModal: boolean;
    handleClose: (values: any) => void;
}

export interface Login {
    username: string;
    password: string;
    handleUsername: (variables: string) => void;
    handlePassword: (variables: string) => void;
}
