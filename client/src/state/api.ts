import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  hireDate: Date;
  terminationDate?: Date;
  gender: Gender;
  race: Race;
  employmentType: EmploymentType;
  position: Position;
  state: string;
  status: EmploymentStatus;
  createdAt: Date;
  updatedAt: Date;
  hiring?: Hiring;
  termination?: Termination;
  stateDetail?: State;
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum Race {
  WHITE = "WHITE",
  BLACK = "BLACK",
  BROWN = "BROWN",
  ASIAN = "ASIAN",
  INDIGENOUS = "INDIGENOUS",
}

export enum EmploymentType {
  CLT = "CLT",
  PJ = "PJ",
  INTERN = "INTERN",
  TEMP = "TEMP",
}

export enum Position {
  ANALYST = "ANALYST",
  COORDINATOR = "COORDINATOR",
  MANAGER = "MANAGER",
  SUPERVISOR = "SUPERVISOR",
  DIRECTOR = "DIRECTOR",
  EXECUTIVE = "EXECUTIVE",
}

export enum EmploymentStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface Hiring {
  id: number;
  employeeId: number;
  hireDate: Date;
  hireType: EmploymentType;
  position: Position;
  createdAt: Date;
  updatedAt: Date;
  employee: Employee;
}

export interface Termination {
  id: number;
  employeeId: number;
  terminationDate?: Date;
  reason: string;
  createdAt: Date;
  updatedAt: Date;
  employee: Employee;
}

export interface State {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  employees: Employee[];
}

export interface DashboardMetrics {
  totalEmployee: Employee[];
  activeEmployees: Employee[];
  inactiveEmployees: Employee[];
  hiresByType: Hiring[];
  terminationsByReason: Termination[];
  employeesByState: Employee[];
  raceDistribution: Employee[];
  hierarchyLevels: Employee[];
  hiresByState: Employee[];
  terminationsByGender: Employee[];
}

/**
 * This api.ts redux toolkit query works like
 * to fetch the backend server created.
 */

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["DashboardMetrics"],
  endpoints: (build) => ({
    getDashBoardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"],
    }),
  }),
});

export const { useGetDashBoardMetricsQuery } = api;
