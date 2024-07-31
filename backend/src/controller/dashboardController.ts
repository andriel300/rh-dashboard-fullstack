import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardMetrics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    /** Número Total de Funcionários */
    const totalEmployee = await prisma.employee.count({
      take: 15,
      orderBy: {
        id: "desc",
      },
    });

    /** Consultar Funcionários Ativos e Inativos */
    const activeEmployees = await prisma.employee.findMany({
      where: { status: "ACTIVE" },
    });
    const inactiveEmployees = await prisma.employee.findMany({
      where: { status: "INACTIVE" },
    });

    /** Contratações por Tipo de Contratação (CLT, PJ, etc.) */
    const hiresByType = await prisma.hiring.groupBy({
      by: ["hireType"],
      _count: {
        hireType: true,
      },
    });

    /** Demissões por Motivo */
    const terminationsByReason = await prisma.termination.groupBy({
      by: ["reason"],
      _count: {
        reason: true,
      },
    });

    /** Funcionários por Estado */
    const employeesByState = await prisma.employee.groupBy({
      by: ["state"],
      _count: {
        state: true,
      },
    });

    /** //! Não funcionou, vou fazer um TODO para consertar depois */
    /** Faixa Etária dos Funcionários */
    // const ageGroups = await prisma.$queryRaw`
    //   SELECT
    //     CASE
    //       WHEN age < 30 then 'Under 30'
    //       WHEN age BETWEEN 30 AND 40 THEN '30-40'
    //       WHEN age BETWEEN 40 AND 50 then '40-50'
    //       ELSE 'Over 50'
    //     END as age_group, count(*)
    //   FROM (
    //     SELECT DATE_PART('year', AGE(birthDate)) as age
    //     FROM "Employee"
    //   ) as age
    //   GROUP BY age_group
    // `;

    /** Distribuição por Raça */
    const raceDistribution = await prisma.employee.groupBy({
      by: ["race"],
      _count: {
        race: true,
      },
    });

    /** Níveis Hierárquicos dos Funcionários */
    const hierarchyLevels = await prisma.employee.groupBy({
      by: ["position"],
      _count: {
        position: true,
      },
    });

    /**
     * Obter dados sobre Contratações e Demissões por
     * Estado, Gênero, Raça, etc.
     */

    const hiresByState = await prisma.employee.groupBy({
      by: ["state"],
      _count: {
        state: true,
      },
    });
    const terminationsByGender = await prisma.employee.groupBy({
      by: ["gender"],
      _count: {
        gender: true,
      },
    });

    res.json({
      totalEmployee,
      activeEmployees,
      inactiveEmployees,
      hiresByType,
      terminationsByReason,
      employeesByState,
      // ageGroups,
      raceDistribution,
      hierarchyLevels,
      hiresByState,
      terminationsByGender,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving dashboard metrics" });
  }
};
