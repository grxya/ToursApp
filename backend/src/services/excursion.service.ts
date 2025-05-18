import {
  AddExcursionDTO,
  ExcursionId,
  RemoveExcursionDTO,
} from "../dtos/excursion.dtos";
import AppError from "../utils/extensions/appError";
import prisma from "../utils/prisma";

export const excursionService = {
  async add(data: AddExcursionDTO) {
    const {
      name,
      description,
      nameRu,
      descriptionRu,
      nameAz,
      descriptionAz,
      nameJa,
      descriptionJa,
      price,
      duration,
      countryId,
    } = data;

    const existingCountry = await prisma.country.findUnique({
      where: { id: countryId },
    });
    if (!existingCountry) {
      throw new AppError("Country not found.", 404);
    }

    const existingExcursion = await prisma.excursion.findFirst({
      where: {
        OR: [{ name }, { nameAz }, { nameRu }, { nameJa }],
      },
    });

    if (existingExcursion) {
      throw new AppError("Excursion with this name already exists.", 400);
    }

    await prisma.excursion.create({
      data: {
        name,
        description,
        nameRu,
        descriptionRu,
        nameAz,
        descriptionAz,
        nameJa,
        descriptionJa,
        price,
        duration: new Date(duration),
        countryId,
      },
    });

    return { status: 201, body: { message: "Excursion added successfully." } };
  },

  async remove(data: RemoveExcursionDTO) {
    const { id } = data;

    const existing = await prisma.excursion.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError("Excursion not found.", 404);
    }

    await prisma.excursion.delete({ where: { id } });

    return {
      status: 201,
      body: { message: "Excursion removed successfully." },
    };
  },

  async getAll() {
    const all = await prisma.excursion.findMany();
    return { status: 201, body: { all } };
  },

  async getById(data: ExcursionId) {
    const { excursionId } = data;

    const excursion = await prisma.excursion.findUnique({
      where: { id: excursionId },
    });

    if (!excursion) {
      throw new AppError("Excursion not found.", 404);
    }

    return { status: 201, body: { excursion } };
  },
};
