import request from "supertest";
import express from "express";
import menuService from "../services/menu.service.js";
import menuRouter from "../routes/menu.route.js";
import jwt from "jsonwebtoken";

jest.mock("../services/menu.service.js");

const app = express();
app.use(express.json());

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
};

app.use(authenticateToken);
app.use("/api/v1/menu", menuRouter);

describe("MenuController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const generateToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
  };

  describe("createMenu", () => {
    it("should create a new menu item and return it", async () => {
      const newMenu = {
        name: "Test Menu",
        price: 10,
        description: "Test description",
      };
      const createdMenu = { id: 1, ...newMenu, user: 1 };
      menuService.createMenuItem.mockResolvedValue(createdMenu);

      const token = generateToken({ id: 1, role: "vendor" });

      const response = await request(app)
        .post("/api/v1/menu")
        .send(newMenu)
        .set("authorization", `Bearer ${token}`);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        message: "Menu created successfully",
        menu: createdMenu,
      });
      expect(menuService.createMenuItem).toHaveBeenCalledWith({
        ...newMenu,
        user: 1,
      });
    });
  });

  describe("getAllMenu", () => {
    it("should return all menu items for the logged-in vendor", async () => {
      const userId = 1;
      const data = [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
      ];
      menuService.getAllMenuItems.mockResolvedValue(data);

      const token = generateToken({ id: userId, role: "customer" });

      const response = await request(app)
        .get("/api/v1/menu/")
        .set("authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Menu retrieved successfully",
        data,
      });
    });
  });

  describe("getOneMenuItem", () => {
    it("should return a single menu item by ID", async () => {
      const itemId = "1";
      const menu = { id: itemId, name: "Item 1" };
      menuService.getOneMenuItem.mockResolvedValue(menu);

      const token = generateToken({ id: 1, role: "vendor" });

      const response = await request(app)
        .get(`/api/v1/menu/${itemId}`)
        .set("authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Menu retrieved successfully",
        menu,
      });
      expect(menuService.getOneMenuItem).toHaveBeenCalledWith(itemId);
    });
  });

  describe("updateMenuItem", () => {
    it("should update a menu item and return the updated item", async () => {
      const itemId = "1";
      const updateDetails = {
        name: "Updated Item",
        price: 20,
        description: "Updated description",
      };
      const updatedMenu = { id: itemId, ...updateDetails };
      menuService.updateMenuItem.mockResolvedValue(updatedMenu);

      const token = generateToken({ id: 1, role: "vendor" });

      const response = await request(app)
        .patch(`/api/v1/menu/${itemId}`)
        .send(updateDetails)
        .set("authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Menu updated successfully",
        menu: updatedMenu,
      });
      expect(menuService.updateMenuItem).toHaveBeenCalledWith(
        itemId,
        updateDetails
      );
    });
  });

  describe("deleteMenuItem", () => {
    it("should delete a menu item and return 204 status", async () => {
      const itemId = "1";
      menuService.deleteMenuItem.mockResolvedValue({ affected: "1" });

      const token = generateToken({ id: 1, role: "vendor" });

      const response = await request(app)
        .delete(`/api/v1/menu/${itemId}`)
        .set("authorization", `Bearer ${token}`);

      expect(response.status).toBe(204);
      expect(menuService.deleteMenuItem).toHaveBeenCalledWith(itemId);
    });
  });
});
