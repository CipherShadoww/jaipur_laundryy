"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const auth_1 = __importDefault(require("./routes/auth"));
const orders_1 = __importDefault(require("./routes/orders"));
const customers_1 = __importDefault(require("./routes/customers"));
const services_1 = __importDefault(require("./routes/services"));
const contact_1 = __importDefault(require("./routes/contact"));
const content_1 = __importDefault(require("./routes/content"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Static files for uploads
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "LuxWash API is running", timestamp: new Date().toISOString() });
});
// Routes
app.use("/api/auth", auth_1.default);
app.use("/api/orders", orders_1.default);
app.use("/api/customers", customers_1.default);
app.use("/api/services", services_1.default);
app.use("/api/contact", contact_1.default);
app.use("/api/content", content_1.default);
app.use("/api/dashboard", dashboard_1.default);
// 404
app.use((req, res) => {
    res.status(404).json({ message: `Route ${req.method} ${req.path} not found` });
});
// Error handler
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ message: "Internal server error" });
});
(async () => {
    await app.listen(PORT);
    console.log(`\n🧺 LuxWash API Server running on http://localhost:${PORT}`);
    console.log(`   Health: http://localhost:${PORT}/api/health\n`);
})();
exports.default = app;
//# sourceMappingURL=index.js.map