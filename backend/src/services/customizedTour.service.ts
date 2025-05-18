import {
  AddCustomizedTourDTO,
  CustomizedTourId,
  RemoveCustomizedTourDTO,
} from "../dtos/customizedTour.dtos";
import AppError from "../utils/extensions/appError";
import prisma from "../utils/prisma";

export const customizedTourService = {
  async add(data: AddCustomizedTourDTO) {
    const { price, duration, countryId, baseTourId, excursionIds } = data;

    const existingCountry = await prisma.country.findUnique({
      where: { id: countryId },
    });
    if (!existingCountry) {
      throw new AppError("Country not found.", 404);
    }

    const existingTour = await prisma.tour.findUnique({
      where: { id: baseTourId },
    });
    if (!existingTour) {
      throw new AppError("Base tour not found.", 404);
    }

    const foundExcursions = await prisma.excursion.findMany({
      where: { id: { in: excursionIds } },
    });
    if (foundExcursions.length !== excursionIds.length) {
      throw new AppError("One or more excursion IDs are invalid", 400);
    }

    await prisma.$transaction(async (prisma) => {
      const customizedTour = await prisma.customizedTour.create({
        data: {
          price,
          duration: new Date(duration),
          countryId,
          baseTourId,
        },
      });

      await prisma.excursionOnCustomizedTour.createMany({
        data: excursionIds.map((excursionId) => ({
          tourId: customizedTour.id,
          excursionId: excursionId,
        })),
      });
    });

    return {
      status: 201,
      body: { message: "CustomizedTour added successfully." },
    };
  },

  async remove(data: RemoveCustomizedTourDTO) {
    const { id } = data;

    const existing = await prisma.customizedTour.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError("CustomizedTour not found.", 404);
    }

    await prisma.customizedTour.delete({ where: { id } });

    return {
      status: 201,
      body: { message: "CustomizedTour removed successfully." },
    };
  },

  async getAll() {
    const all = await prisma.customizedTour.findMany();
    return { status: 201, body: { all } };
  },

  async getById(data: CustomizedTourId) {
    const { customizedTourId } = data;

    const CustomizedTour = await prisma.customizedTour.findUnique({
      where: { id: customizedTourId },
    });
    if (!CustomizedTour) {
      throw new AppError("CustomizedTour not found.", 404);
    }

    return { status: 201, body: { CustomizedTour } };
  },
};
