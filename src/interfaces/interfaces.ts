export  interface iRoomCards{
    name:string,
    availability:"free"| "booked"|"coming";
    description:string;
    capacity:number;
    id:number;
}