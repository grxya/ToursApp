import { AddTourDTO, TourId, RemoveTourDTO, TourCountryId } from "../dtos/tour.dtos";
import AppError from "../utils/extensions/appError";
import prisma from "../utils/prisma";

export const tourService = {
  async add(data: AddTourDTO) {
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
      excursionIds,
    } = data;

    const existingCountry = await prisma.country.findUnique({
      where: { id: countryId },
    });
    if (!existingCountry) {
      throw new AppError("Country not found.", 404);
    }

    const existingTour = await prisma.tour.findFirst({
      where: {
        OR: [{ name }, { nameAz }, { nameRu }, { nameJa }],
      },
    });

    if (existingTour) {
      throw new AppError("Excursion with this name already exists.", 400);
    }

    const foundExcursions = await prisma.excursion.findMany({
      where: { id: { in: excursionIds } },
    });

    if (foundExcursions.length !== excursionIds.length) {
      throw new AppError("One or more excursion IDs are invalid", 400);
    }

    await prisma.$transaction(async (prisma) => {
      const tour = await prisma.tour.create({
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

      await prisma.excursionOnTour.createMany({
        data: excursionIds.map((excursionId) => ({
          tourId: tour.id,
          excursionId: excursionId,
        })),
      });
    });

    return { status: 201, body: { message: "Tour added successfully." } };
  },

  async remove(data: RemoveTourDTO) {
    const { id } = data;

    const existing = await prisma.tour.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError("Tour not found.", 404);
    }

    await prisma.tour.delete({ where: { id } });

    return {
      status: 201,
      body: { message: "Tour removed successfully." },
    };
  },

  async getAll() {
    const all = await prisma.tour.findMany({
      include: {
        excursions: true,
      },
    });
    return { status: 201, body: { all } };
  },

  async getById(data: TourId) {
    const { tourId } = data;

    const tour = await prisma.tour.findUnique({
      where: { id: tourId },
      include: {
        excursions: true,
      },
    });
    if (!tour) {
      throw new AppError("Tour not found.", 404);
    }

    return { status: 201, body: { tour } };
  },

  async getByCountry(data: TourCountryId) {
    const { countryId } = data;

    const tour = await prisma.tour.findMany({
      where: { countryId: countryId },
      include: {
        excursions: true,
      },
    });
    if (!tour) {
      throw new AppError("Tour not found.", 404);
    }

    return { status: 201, body: { tour } };
  },
};
