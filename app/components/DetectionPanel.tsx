
"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";

type Detection = {
  class_id?: number;
  class_name?: string;
  confidence?: number;
  bbox?: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
};

type DetectionResult = {
  success?: boolean;
  error?: string;
  message?: string;
  filename?: string;
  count?: number;
  detections?: Detection[];
  annotated_image?: string;
  image_size?: {
    width: number;
    height: number;
  };
};

const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://127.0.0.1:5000/predict"
).replace(/\/+$/, "");

export default function DetectionPanel() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] =
    useState<DetectionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!preview) return;

    return () => URL.revokeObjectURL(preview);
  }, [preview]);

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const selected = event.target.files?.[0];
    if (!selected) return;

    setError("");
    setResult(null);

    const supportedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!supportedTypes.includes(selected.type)) {
      setError("กรุณาเลือกภาพ JPG, PNG หรือ WEBP");
      event.target.value = "";
      return;
    }

    if (selected.size > 12 * 1024 * 1024) {
      setError("รูปภาพต้องมีขนาดไม่เกิน 12 MB");
      event.target.value = "";
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  async function detectPerson() {
    if (!file) {
      setError("กรุณาเลือกรูปภาพก่อนเริ่มตรวจจับ");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `${API_BASE}/predict`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data =
        (await response.json()) as DetectionResult;

      if (!response.ok || data.success === false) {
        throw new Error(
          data.error || "ไม่สามารถตรวจจับภาพได้"
        );
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "เชื่อมต่อ Flask API ไม่สำเร็จ"
      );
    } finally {
      setLoading(false);
    }
  }

  function resetDetection() {
    setFile(null);
    setPreview("");
    setResult(null);
    setError("");
  }

  const detections = result?.detections ?? [];
  const personCount = result
    ? result.count ?? detections.length
    : 0;

  const imageToShow =
    result?.annotated_image || preview;

  const confidenceValues = detections
    .map((person) => person.confidence)
    .filter((value): value is number =>
      typeof value === "number"
    );

  const highestConfidence =
    confidenceValues.length > 0
      ? Math.max(...confidenceValues)
      : null;

  return (
    <section className="detection-section" id="detection">
      <div className="section-heading">
        <span className="section-eyebrow">
          01 / AI DETECTION
        </span>

        <h2>
          ทดลองตรวจจับ<span>คนในภาพ</span>
        </h2>

        <p>
          เลือกรูปภาพ แล้วให้ AI วิเคราะห์บุคคลให้อัตโนมัติ
        </p>
      </div>

      <div className="detection-layout">
        <div className="panel-card upload-card">
          <div className="card-heading">
            <div>
              <span className="card-step">STEP 01</span>
              <h3>อัปโหลดรูปภาพ</h3>
            </div>

            <span className="card-icon">↑</span>
          </div>

          <label className="upload-zone">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              disabled={loading}
            />

            <span className="upload-illustration">▧</span>
            <strong>เลือกภาพจากคอมพิวเตอร์</strong>
            <span className="upload-hint">
              คลิกเพื่อเลือกไฟล์ภาพที่ต้องการ
            </span>
            <span className="upload-formats">
              JPG · PNG · WEBP
            </span>
          </label>

          {file && (
            <div className="selected-file">
              <span className="file-icon">▧</span>

              <div className="file-info">
                <strong>{file.name}</strong>
                <span>
                  {(file.size / 1024).toFixed(1)} KB
                </span>
              </div>

              <button
                type="button"
                className="remove-file"
                onClick={resetDetection}
                disabled={loading}
                aria-label="ลบรูปภาพ"
              >
                ×
              </button>
            </div>
          )}

          <button
            type="button"
            className="detect-button"
            onClick={detectPerson}
            disabled={!file || loading}
          >
            <span>{loading ? "◌" : "✦"}</span>
            {loading
              ? "กำลังประมวลผล..."
              : "เริ่มตรวจจับคนด้วย AI"}
            {!loading && <span className="button-arrow">→</span>}
          </button>

          <p className="upload-footnote">
            ประมวลผลผ่าน Flask API และโมเดล YOLO
          </p>

          {loading && (
            <div className="loading-state" role="status">
              <span className="loading-spinner" />
              <span>
                AI กำลังวิเคราะห์ภาพ กรุณารอสักครู่
              </span>
            </div>
          )}

          {error && (
            <div className="error-state" role="alert">
              <strong>ตรวจจับไม่สำเร็จ</strong>
              <p>{error}</p>
              <small>
                ตรวจสอบว่า Flask ทำงานอยู่และ URL ถูกต้อง
              </small>
            </div>
          )}
        </div>

        <div className="panel-card result-card">
          <div className="card-heading">
            <div>
              <span className="card-step">STEP 02</span>
              <h3>ผลการตรวจจับ</h3>
            </div>

            <span className="result-live">
              <span /> AI RESULT
            </span>
          </div>

          <div className="result-image">
            {imageToShow ? (
              <img
                src={imageToShow}
                alt="ภาพตัวอย่างหรือภาพที่ตรวจจับบุคคลแล้ว"
              />
            ) : (
              <div className="result-placeholder">
                <span className="placeholder-icon">▧</span>
                <strong>พร้อมวิเคราะห์ภาพ</strong>
                <p>
                  ภาพที่เลือกและผลตรวจจับจะแสดงตรงนี้
                </p>
              </div>
            )}

            {result && (
              <span className="image-result-tag">
                ✓ วิเคราะห์เสร็จแล้ว
              </span>
            )}
          </div>

          {result ? (
            <>
              <div className="result-stats">
                <div className="stat-box">
                  <span>จำนวนคน</span>
                  <strong>{personCount}</strong>
                  <small>PERSONS DETECTED</small>
                </div>

                <div className="stat-box">
                  <span>Confidence สูงสุด</span>
                  <strong>
                    {highestConfidence === null
                      ? "—"
                      : `${(highestConfidence * 100).toFixed(1)}%`}
                  </strong>
                  <small>MODEL SCORE</small>
                </div>
              </div>

              <div
                className={
                  personCount > 0
                    ? "result-notice result-found"
                    : "result-notice result-empty"
                }
              >
                <span>
                  {personCount > 0 ? "✓" : "i"}
                </span>

                <div>
                  <strong>
                    {personCount > 0
                      ? "ตรวจพบคนในภาพ"
                      : "ไม่พบคนในภาพ"}
                  </strong>
                  <p>
                    {result.message ||
                      "การวิเคราะห์ภาพเสร็จเรียบร้อย"}
                  </p>
                </div>
              </div>

              <div className="person-list">
                <h4>รายละเอียดบุคคล</h4>

                {detections.length === 0 ? (
                  <p className="empty-people">
                    ไม่มีรายการบุคคลที่ตรวจพบ
                  </p>
                ) : (
                  detections.map((person, index) => (
                    <div
                      className="person-row"
                      key={`${index}-${person.bbox?.x1 ?? 0}`}
                    >
                      <span className="person-avatar">♙</span>

                      <div className="person-detail">
                        <strong>
                          {person.class_name || "person"} #{index + 1}
                        </strong>
                        <span>
                          {person.bbox
                            ? `พิกัดกรอบ: ${Math.round(person.bbox.x1)}, ${Math.round(person.bbox.y1)} – ${Math.round(person.bbox.x2)}, ${Math.round(person.bbox.y2)}`
                            : "ตรวจพบบุคคล"}
                        </span>
                      </div>

                      <span className="confidence-pill">
                        {typeof person.confidence === "number"
                          ? `${(person.confidence * 100).toFixed(1)}%`
                          : "—"}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <details className="json-panel">
                <summary>ดูข้อมูล JSON จาก Flask</summary>
                <pre>
                  {JSON.stringify(result, null, 2)}
                </pre>
              </details>
            </>
          ) : (
            <div className="result-empty-note">
              <span>✦</span>
              <p>
                ผลลัพธ์ จำนวนคน และคะแนนความมั่นใจ
                จะแสดงหลังประมวลผลสำเร็จ
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
