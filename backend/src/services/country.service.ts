import {
  AddCountryDTO,
  CountryId,
  RemoveCountryDTO,
} from "../dtos/country.dtos";
import AppError from "../utils/extensions/appError";
import prisma from "../utils/prisma";

export const countryService = {
  async add(data: AddCountryDTO) {
    const {
      name,
      description,
      nameRu,
      descriptionRu,
      nameAz,
      descriptionAz,
      nameJa,
      descriptionJa,
      currency,
    } = data;

    const existing = await prisma.country.findFirst({
      where: {
        OR: [{ name }, { nameAz }, { nameRu }, { nameJa }],
      },
    });

    if (existing) {
      throw new AppError("Country with this name already exists.", 400);
    }

    await prisma.country.create({
      data: {
        name,
        description,
        nameRu,
        descriptionRu,
        nameAz,
        descriptionAz,
        nameJa,
        descriptionJa,
        currency,
      },
    });

    return { status: 201, body: { message: "Country added successfully." } };
  },

  async remove(data: RemoveCountryDTO) {
    const { id } = data;

    const existing = await prisma.country.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError("Country not found.", 404);
    }

    await prisma.country.delete({ where: { id } });

    return { status: 201, body: { message: "Country removed successfully." } };
  },

  async getAll() {
    const all = await prisma.country.findMany();
    return { status: 201, body: { all } };
  },

  async getById(data: CountryId) {

    const { countryId } = data;
    const country = await prisma.country.findUnique({
      where: { id: countryId },
    });


    if (!country) {
      throw new AppError("Country not found.", 404);
    }

    return { status: 201, body: { country } };
  },
};
