import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

async function deleteAllData() {
  // Ordem inversa de deleção para evitar problemas de chaves estrangeiras
  await prisma.termination.deleteMany({});
  await prisma.hiring.deleteMany({});
  await prisma.employee.deleteMany({});
  await prisma.state.deleteMany({});
}

async function main() {
  const dataDirectory = path.join(__dirname, "seedData");

  const fileMapping = {
    employees: "employees.json",
    hirings: "hirings.json",
    terminations: "terminations.json",
    states: "states.json",
  };

  await deleteAllData();

  // Seed States first because Employees depend on it
  const stateData = JSON.parse(
    fs.readFileSync(path.join(dataDirectory, fileMapping.states), "utf-8")
  );
  for (const data of stateData) {
    await prisma.state.create({
      data,
    });
  }
  console.log(`Seeded State with data from ${fileMapping.states}`);

  // Seed Employees
  const employeeData = JSON.parse(
    fs.readFileSync(path.join(dataDirectory, fileMapping.employees), "utf-8")
  );
  for (const data of employeeData) {
    await prisma.employee.create({
      data,
    });
  }
  console.log(`Seeded Employee with data from ${fileMapping.employees}`);

  // Seed Hirings
  const hiringData = JSON.parse(
    fs.readFileSync(path.join(dataDirectory, fileMapping.hirings), "utf-8")
  );
  for (const data of hiringData) {
    await prisma.hiring.create({
      data,
    });
  }
  console.log(`Seeded Hiring with data from ${fileMapping.hirings}`);

  // Seed Terminations
  const terminationData = JSON.parse(
    fs.readFileSync(path.join(dataDirectory, fileMapping.terminations), "utf-8")
  );
  for (const data of terminationData) {
    // Ensure the employeeId exists in Employee table before creating Termination
    const employee = await prisma.employee.findUnique({
      where: { id: data.employeeId },
    });

    if (employee) {
      await prisma.termination.create({
        data: {
          employeeId: data.employeeId,
          terminationDate: data.terminationDate,
          reason: data.reason,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        },
      });
      console.log(
        `Seeded Termination with data from ${fileMapping.terminations}`
      );
    } else {
      console.error(`Employee with id ${data.employeeId} not found.`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
