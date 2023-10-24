export interface IQuery {
    year: number;
    count: number
}

export interface IQueryByYear {
    "Event.Id": string;
    "Investigation.Type": string;
    "Accident.Number": string;
    "Event.Date": 306374400000;
    "Location": string;
    "Country": string;
    "Latitude": 42.445277;
    "Longitude": -70.758333;
    "Airport.Code": string;
    "Airport.Name": string;
    "Injury.Severity": string;
    "Aircraft.Damage": string;
    "Aircraft.Category": string;
    "Registration.Number": string;
    "Make": string;
    "Model": string;
    "Amateur.Built": string;
    "Number.of.Engines": 2.0;
    "Engine.Type": string;
    "FAR.Description": string;
    "Schedule": string;
    "Purpose.of.Flight": string;
    "Air.Carrier": string;
    "Total.Fatal.Injuries": number;
    "Total.Serious.Injuries": number;
    "Total.Minor.Injuries": number;
    "Total.Uninjured": number;
    "Weather.Condition": string;
    "Broad.Phase.of.Flight": string;
    "Report.Status": string;
    "Publication.Date": string;
    "Year": number;
}