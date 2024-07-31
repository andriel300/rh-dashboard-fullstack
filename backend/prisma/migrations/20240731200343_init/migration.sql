-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "Race" AS ENUM ('WHITE', 'BLACK', 'BROWN', 'ASIAN', 'INDIGENOUS');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('CLT', 'PJ', 'INTERN', 'TEMP');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('ANALYST', 'COORDINATOR', 'MANAGER', 'SUPERVISOR', 'DIRECTOR', 'EXECUTIVE');

-- CreateEnum
CREATE TYPE "EmploymentStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "hireDate" TIMESTAMP(3) NOT NULL,
    "terminationDate" TIMESTAMP(3),
    "gender" "Gender" NOT NULL,
    "race" "Race" NOT NULL,
    "employmentType" "EmploymentType" NOT NULL,
    "position" "Position" NOT NULL,
    "state" TEXT NOT NULL,
    "status" "EmploymentStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "stateId" INTEGER,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hiring" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "hireDate" TIMESTAMP(3) NOT NULL,
    "hireType" "EmploymentType" NOT NULL,
    "position" "Position" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hiring_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Termination" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "terminationDate" TIMESTAMP(3),
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Termination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Employee_state_idx" ON "Employee"("state");

-- CreateIndex
CREATE INDEX "Employee_status_idx" ON "Employee"("status");

-- CreateIndex
CREATE INDEX "Employee_employmentType_idx" ON "Employee"("employmentType");

-- CreateIndex
CREATE INDEX "Employee_position_idx" ON "Employee"("position");

-- CreateIndex
CREATE INDEX "Employee_race_idx" ON "Employee"("race");

-- CreateIndex
CREATE UNIQUE INDEX "Hiring_employeeId_key" ON "Hiring"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "Termination_employeeId_key" ON "Termination"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "State_name_key" ON "State"("name");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hiring" ADD CONSTRAINT "Hiring_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Termination" ADD CONSTRAINT "Termination_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
