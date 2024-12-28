import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  School: a.model({
    name: a.string().required(),
    type: a.string().required(),
    establishmentYear: a.integer(),
    board: a.enum(["CBSE", "ICSE", "CGBSE"]),
    contactInformation: a.customType({
      officialEmail: a.string().required(),
      alternateEmail: a.string(),
      primaryPhone: a.string().required(),
      secondaryPhone: a.string(),
      landline: a.string(),
      websiteUrl: a.string(),
    }),
    address: a.customType({
      street: a.string(),
      city: a.string().required(),
      state: a.string().default("Chhattisgarh").required(),
      postalCode: a.string().required(),
      country: a.string().default("IN").required(),
    }),
    registrationNumber: a.string(),
    udiseCode: a.string(),
  }),

  // religion: a.string(),
  //   caste: a.string(),
  //   isMinority: a.boolean().default(false),
  //   aadharNumber: a.string(),
  Student: a.model({
    schoolInformation: a.customType({
      schoolId: a.ref("School"),
      admissionNumber: a.string(),
      joiningDate: a.string(),
      leavingDate: a.string(),
    }),
    firstName: a.string(),
    lastName: a.string(),
    middleName: a.string(),
    dateOfBirth: a.string(),
    gender: a.enum(["Male", "Female", "Other", "Prefer not to say"]),
    contactInformation: a.customType({
      email: a.string(),
      primaryPhone: a.string(),
      secondaryPhone: a.string(),
    }),
    address: a.customType({
      street: a.string(),
      postOffice: a.string(),
      area: a.string(),
      city: a.string(),
      district: a.string(),
      state: a.string().default("Chhattisgarh"),
      postalCode: a.string(),
      country: a.string().default("IN"),
    }),
    parentsInformation: a.customType({
      father: a.ref("Parent"),
      mother: a.ref("Parent"),
      guardian: a.ref("Parent"),
    }),
    healthDetails: a.customType({
      bloodGroup: a.string(),
      height: a.string(),
      weight: a.string(),
      isDisable: a.boolean(),
      disabilityType: a.string(),
      disabilityPercentage: a.string(),
      healthNotes: a.string(),
    }),
    classInformation: a.customType({
      class: a.ref("Class"),
      rollNumber: a.string(),
      section: a.string(),
      session: a.string(),
    }),
    status: a.enum(["Active", "Inactive", "Suspended", "Transferred"]),
    customFields: a.json(),
  }),

  Teacher: a.model({
    schoolInformation: a.customType({
      employeeId: a.string(),
      joiningDate: a.string(),
      leavingDate: a.string(),
    }),
    firstName: a.string().required(),
    lastName: a.string(),
    middleName: a.string(),
    dateOfBirth: a.string(),
    gender: a.enum(["Male", "Female", "Other", "Prefer not to say"]),
    educationDetails: a.customType({
      qualification: a.string(),
      specialization: a.string(),
      experience: a.string(),
    }),
    contactInformation: a.customType({
      email: a.string(),
      primaryPhone: a.string(),
      secondaryPhone: a.string(),
    }),
    address: a.customType({
      street: a.string(),
      postOffice: a.string(),
      area: a.string(),
      city: a.string(),
      district: a.string(),
      state: a.string().default("Chhattisgarh"),
      postalCode: a.string(),
      country: a.string().default("IN"),
    }),
    healthDetails: a.customType({
      bloodGroup: a.string(),
      isDisable: a.boolean(),
      disabilityType: a.string(),
      disabilityPercentage: a.string(),
      healthNotes: a.string(),
    }),
    customFields: a.json(),
  }),

  Parent: a.model({
    name: a.string().required(),
    aadharNumber: a.string(),
    contactInformation: a.customType({
      email: a.string(),
      primaryPhone: a.string(),
      secondaryPhone: a.string(),
    }),
    languageDetails: a.customType({
      motherTounge: a.string(),
      languagesSpoken: a.string(),
    }),
    education: a.string(),
    occupation: a.string(),
    students: a.hasMany("Student", "id"),
    customFields: a.json(),
  }),

  Staff: a.model({
    firstName: a.string().required(),
    lastName: a.string(),
    middleName: a.string(),
    dateOfBirth: a.string(),
    gender: a.enum(["Male", "Female", "Other", "Prefer not to say"]),
    aadharNumber: a.string(),
    educationDetails: a.customType({
      qualification: a.string(),
      experience: a.string(),
    }),
    contactInformation: a.customType({
      email: a.string(),
      primaryPhone: a.string(),
      secondaryPhone: a.string(),
    }),
    address: a.customType({
      street: a.string(),
      postOffice: a.string(),
      area: a.string(),
      city: a.string(),
      district: a.string(),
      state: a.string().default("Chhattisgarh"),
      postalCode: a.string(),
      country: a.string().default("IN"),
    }),
    healthDetails: a.customType({
      bloodGroup: a.string(),
      isDisable: a.boolean(),
      disabilityType: a.string(),
      disabilityPercentage: a.string(),
      healthNotes: a.string(),
    }),
    languageDetails: a.customType({
      motherTounge: a.string(),
      languagesSpoken: a.string(),
    }),
    schoolInformation: a.customType({
      employeeId: a.string(),
      joiningDate: a.string(),
      leavingDate: a.string(),
    }),
    customFields: a.json(),
  }),

  Subject: a.model({
    name: a.string().required(),
    code: a.string(),
    subjectType: a.string(),
    description: a.string(),
    language: a.string(),
    session: a.string(),
    teachers: a.hasMany("Teacher", "id"),
    students: a.hasMany("Student", "id"),
    notes: a.string(),
    customFields: a.json(),
  }),

  Class: a.model({
    name: a.string().required(),
    section: a.string(),
    classTeacher: a.ref("Teacher"),
    subjects: a.hasMany("Subject", "id"),
    students: a.hasMany("Student", "id"),
    schoolId: a.belongsTo("School", "id"),
    notes: a.string(),
    customFields: a.json(),
  }),

  Bill: a.model({
    billNumber: a.string(),
    billDate: a.string(),
    dueDate: a.string(),
    amount: a.string(),
    status: a.enum(["Paid", "Unpaid", "Partially Paid"]),
    student: a.ref("Student"),
    customFields: a.json(),
  }),

  Fee: a.model({
    name: a.string(),
    code: a.string(),
    description: a.string(),
    amount: a.string(),
    frequency: a.string(),
    session: a.string(),
    class: a.ref("Class"),
    students: a.hasMany("Student", "id"),
    customFields: a.json(),
  }),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
