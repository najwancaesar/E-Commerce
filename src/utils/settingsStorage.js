    const SETTINGS_KEY = "lcd_settings";

    const DEFAULT_SETTINGS = {
    storeName: "LCD",
    companyName: "PT Local Central Digital",
    supportEmail: "support@lcd.co.id",
    supportPhone: "+62 812-0000-0000",
    shippingFee: 20000,
    };

    export function readSettings() {
    try {
        const raw = localStorage.getItem(SETTINGS_KEY);
        const parsed = raw ? JSON.parse(raw) : {};
        return { ...DEFAULT_SETTINGS, ...(parsed || {}) };
    } catch {
        return { ...DEFAULT_SETTINGS };
    }
    }

    export function writeSettings(partial) {
    const current = readSettings();
    const next = { ...current, ...(partial || {}) };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
    return next;
    }
