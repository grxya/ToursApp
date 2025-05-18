import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import jwt from "fastify-jwt";
import fastifyCookie from "fastify-cookie";
import { version } from "../package.json";
import { authRoutes } from "./routes/auth.routes";
import { authSchemas } from "./dtos/auth.dtos";
import { countryRoutes } from "./routes/country.routes";
import { countrySchemas } from "./dtos/country.dtos";
import { roleSchemas } from "./dtos/role.dtos";
import { roleRoutes } from "./routes/role.routes";
import { reviewSchemas } from "./dtos/review.dtos";
import { reviewRoutes } from "./routes/review.routes";
import { bookingRoutes } from "./routes/booking.routes";
import { bookingSchemas } from "./dtos/booking.dtos";
import { excursionRoutes } from "./routes/excursion.routes";
import { excursionSchemas } from "./dtos/excursion.dtos";
import { tourRoutes } from "./routes/tour.routes";
import { tourSchemas } from "./dtos/tour.dtos";
import { errorHandler } from "./middlewares/error.handler";
import { customizedTourRoutes } from "./routes/customizedTour.routes";
import { customizedTourSchemas } from "./dtos/customizedTour.dtos";
import { authenticate } from "./middlewares/jwt.middleware";
import { cartItemSchemas } from "./dtos/cartItem.dtos";
import { cartItemRoutes } from "./routes/cartItem.routes";

export async function buildServer() {
  const server = fastify({ logger: true });

  server.setErrorHandler(errorHandler);

  await server.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Tours API",
        description: "API documentation",
        version,
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            description:
              "RSA256 JWT signed by private key, with username in payload",
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
  });

  await server.register(fastifySwaggerUI, {
    routePrefix: "/swagger",
    uiConfig: {
      docExpansion: "list",
    },
    staticCSP: true,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });

  server.register(jwt, {
    secret: `${process.env.JWT_SECRET}`,
  });

  await server.register(fastifyCookie);

  server.register(fastifyCors, {
    origin: ["http://localhost:3000"],
    credentials: true,
  });

  server.addHook("onRequest", authenticate);

  for (const schema of [
    ...authSchemas,
    ...countrySchemas,
    ...roleSchemas,
    ...reviewSchemas,
    ...bookingSchemas,
    ...excursionSchemas,
    ...tourSchemas,
    ...customizedTourSchemas,
    ...cartItemSchemas,
  ]) {
    server.addSchema(schema);
  }

  await server.register(authRoutes, { prefix: `api/v${version}/auth` });
  await server.register(roleRoutes, { prefix: `api/v${version}/roles` });
  await server.register(countryRoutes, { prefix: `api/v${version}/countries` });
  await server.register(reviewRoutes, { prefix: `api/v${version}/reviews` });
  await server.register(bookingRoutes, { prefix: `api/v${version}/bookings` });
  await server.register(excursionRoutes, {
    prefix: `api/v${version}/excursions`,
  });
  await server.register(tourRoutes, { prefix: `api/v${version}/tours` });
  await server.register(customizedTourRoutes, {
    prefix: `api/v${version}/customizedTours`,
  });
  await server.register(cartItemRoutes, { prefix: `api/v${version}/cartItems` });


  server.get(
    "/healthcheck",
    {
      schema: {
        hide: true,
      },
    },
    async function () {
      return { status: "OK" };
    }
  );

  server.get(
    "/",
    {
      schema: {
        hide: true,
      },
    },
    async (request, reply) => {
      reply.redirect("/swagger");
    }
  );

  return server;
}
