import request from "supertest";
import express from "express";
import userService from "../services/user.service.js";
import menuService from "../services/menu.service.js";
import UserController from "../controllers/user.controller.js";
import MenuController from "../controllers/menu.controller.js";
import { authenticateToken } from "../middlewares/auth.js";
import jwt from "jsonwebtoken";

jest.mock("../services/user.service.js");
jest.mock("../services/menu.service.js");

const app = express();
app.use(express.json());
app.post("/register", (req, res, next) =>
  UserController.register(req, res, next)
);
app.post("/login", (req, res, next) => UserController.login(req, res, next));
app.get("/vendors", (req, res, next) =>
  UserController.getAllVendors(req, res, next)
);
app.get("/vendors/:id/menu", (req, res, next) =>
  MenuController.getAllMenuByVendorForCustomers(req, res, next)
);
app.get("/vendors/:id", (req, res, next) =>
  UserController.getOneVendor(req, res, next)
);

app.use(authenticateToken);

describe("UserController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const generateToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
  };

  describe("register", () => {
    it("should register a new user and return the user with a token", async () => {
      const newUser = { email: "test@example.com", password: "password123" };
      const savedUser = { id: 1, email: "test@example.com" };
      const token = "fake-token";

      userService.register.mockResolvedValue({ user: savedUser, token });

      const response = await request(app).post("/register").send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ user: savedUser, token });
      expect(userService.register).toHaveBeenCalledWith(newUser);
    });
  });

  describe("login", () => {
    it("should login a user and return the user with a token", async () => {
      const loginDetails = {
        email: "test@example.com",
        password: "password123",
      };
      const user = { id: 1, email: "test@example.com" };
      const token = "fake-token";

      userService.login.mockResolvedValue({ user, token });

      const response = await request(app).post("/login").send(loginDetails);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ user, token });
      expect(userService.login).toHaveBeenCalledWith(loginDetails);
    });
  });

  describe("getAllVendors", () => {
    it("should return all vendors", async () => {
      const vendors = [
        { id: 1, businessName: "Vendor 1", address: "Address 1" },
        { id: 2, businessName: "Vendor 2", address: "Address 2" },
      ];

      userService.getAllVendors.mockResolvedValue(vendors);

      const response = await request(app).get("/vendors");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Vendors retrieved successfully",
        vendors,
      });
      expect(userService.getAllVendors).toHaveBeenCalled();
    });
  });

  describe("getOneVendor", () => {
    it("should return a single vendor by ID", async () => {
      const vendor = { id: 1, businessName: "Vendor 1", address: "Address 1" };

      userService.getVendorById.mockResolvedValue(vendor);

      const response = await request(app).get("/vendors/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Vendor retrieved successfully",
        vendor,
      });
      expect(userService.getVendorById).toHaveBeenCalledWith("1");
    });
  });

  describe("customer getAllMenu for a vendor", () => {
    it("should return all menu items for a vendor for the logged-in customer", async () => {
      const vendorId = 1;
      const menu = [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
      ];
      menuService.getMenuItemsByVendorId.mockResolvedValue(menu);

      const token = generateToken({ id: vendorId, role: "customer" });

      const response = await request(app)
        .get(`/vendors/:${vendorId}/menu`)
        .set("authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Menu retrieved successfully",
        menu,
      });
    });
  });
});
