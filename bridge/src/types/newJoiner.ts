export interface NewJoiner {
    id?: number;                    // Optional because Access generates this (AUTOINCREMENT)
    firstName: string;              // Required
    lastName: string;               // Required
    jobTitle?: string;
    companyEmail?: string;
    staffInitial?: string;
    phoneExtension?: string;
    joinDate?: string | Date;       // Can be a string from a form or a Date object
    localDomainUser?: string;
    department?: string;
    tidApprovalStatus?: string;
    defaultPrinter?: string;

    // These match the MEMO fields in Access for long text strings
    accessResource?: string;
    localDomainUserGroup?: string;
    emailUserGroup?: string;

    createdAt?: Date;               // Managed by Access (DEFAULT Now())
}