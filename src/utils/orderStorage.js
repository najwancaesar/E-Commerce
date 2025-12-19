    const ORDERS_KEY = "lcd_orders";
    const ORDERS_EVENT = "lcd_orders_updated";

    function emitOrdersUpdated() {
    if (typeof window !== "undefined") {
        window.dispatchEvent(new Event(ORDERS_EVENT));
    }
    }

    export function onOrdersUpdated(handler) {
    if (typeof window === "undefined") return () => {};
    window.addEventListener(ORDERS_EVENT, handler);
    return () => window.removeEventListener(ORDERS_EVENT, handler);
    }

    export function readOrders() {
    try {
        const raw = localStorage.getItem(ORDERS_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
    }

    export function writeOrders(orders) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    emitOrdersUpdated();
    }

    export function createOrder(order) {
    const orders = readOrders();
    const next = [order, ...orders];
    writeOrders(next);
    return order;
    }

    export function getUserOrders(userId) {
    if (!userId) return [];
    return readOrders().filter((o) => o.userId === userId);
    }

    export function updateOrderStatus(orderId, status) {
    const orders = readOrders();
    const next = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    writeOrders(next);
    return next.find((o) => o.id === orderId) || null;
    }

    export function getOrderSummary() {
    const orders = readOrders();
    const totalOrders = orders.length;
    const pendingOrders = orders.filter((o) => o.status === "pending").length;
    const paidOrders = orders.filter((o) => o.status === "paid").length;

    const revenuePaid = orders
        .filter((o) => o.status === "paid")
        .reduce((sum, o) => sum + (Number(o.total) || 0), 0);

    const revenueAll = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

    return { totalOrders, pendingOrders, paidOrders, revenuePaid, revenueAll };
    }
