
"use client";

import { useState } from "react";

type ApiState = "idle" | "checking" | "online" | "offline";

const API_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://127.0.0.1:5000/health"
).replace(/\/+$/, "");

export default function ApiStatus() {
  const [status, setStatus] = useState<ApiState>("idle");

  async function checkApi() {
    setStatus("checking");

    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      8000
    );

    try {
      const response = await fetch(
        `${API_URL}/api/health`,
        {
          method: "GET",
          cache: "no-store",
          signal: controller.signal,
        }
      );

      const data = await response.json();

      if (!response.ok || data.success !== true) {
        throw new Error("API unavailable");
      }

      setStatus("online");
    } catch {
      setStatus("offline");
    } finally {
      clearTimeout(timeout);
    }
  }

  const labels: Record<ApiState, string> = {
    idle: "ตรวจสอบการเชื่อมต่อ API",
    checking: "กำลังตรวจสอบ API...",
    online: "เชื่อมต่อ API สำเร็จ",
    offline: "เชื่อมต่อไม่ได้ · ลองอีกครั้ง",
  };

  return (
    <section className="api-bottom-section">
      <span className="api-bottom-label">
        SYSTEM CONNECTION
      </span>

      <h3>ทุกอย่างพร้อมทำงานหรือยัง?</h3>

      <p>
        ตรวจสอบว่า Flask Backend ตอบสนองและพร้อมรับภาพหรือไม่
      </p>

      <button
        type="button"
        className={`api-modern-button api-${status}`}
        onClick={checkApi}
        disabled={status === "checking"}
      >
        <span className="api-button-icon">
          {status === "checking"
            ? "◌"
            : status === "online"
              ? "✓"
              : status === "offline"
                ? "!"
                : "⌁"}
        </span>

        {labels[status]}
      </button>

      <div
        className={`api-status-caption api-caption-${status}`}
        role="status"
        aria-live="polite"
      >
        <span className="api-indicator" />

        {status === "idle" && "รอการตรวจสอบ"}
        {status === "checking" && "กำลังติดต่อ Flask Backend"}
        {status === "online" && "Flask API ตอบกลับเรียบร้อย"}
        {status === "offline" &&
          "ตรวจสอบการเปิด Flask, URL และ CORS"}
      </div>
    </section>
  );
}
