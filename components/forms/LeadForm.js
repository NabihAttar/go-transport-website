"use client";

import { useState } from "react";

export default function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setStatus(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString().trim() || "";
    const phone =
      formData.get("phone")?.toString().trim() ||
      formData.get("Phone")?.toString().trim() ||
      "";
    const message = formData.get("message")?.toString().trim() || "";

    if (!name || !phone || !message) {
      setStatus({
        type: "error",
        message: "Please fill in all required fields.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, message }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.message || "Failed to submit your request.");
      }

      setStatus({
        type: "success",
        message: "Thanks! Our team will reach out shortly.",
      });

      event.currentTarget.reset();
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        className="contact-form-validated why-choose-one__form"
        action="assets/inc/sendemail.php"
        method="post"
        onSubmit={handleSubmit}
      >
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6">
            <div
              className="input-box"
              style={{
                backgroundColor: "white",
                borderRadius: "3px",
              }}
            >
              <input type="text" name="name" placeholder="Name" required />
              <div className="icon">
                <span className="icon-user"></span>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6">
            <div
              className="input-box"
              style={{
                backgroundColor: "white",
                borderRadius: "3px",
              }}
            >
              <input type="text" name="Phone" placeholder="Phone" required />
              <div className="icon">
                <span className="icon-phone2"></span>
              </div>
            </div>
          </div>

          <div className="col-xl-12">
            <div
              className="input-box"
              style={{
                backgroundColor: "white",
                borderRadius: "3px",
              }}
            >
              <textarea name="message" placeholder="Message"></textarea>
              <div className="icon style2">
                <span className="icon-pen"></span>
              </div>
            </div>
          </div>

          <div className="col-xl-12">
            <div className="why-choose-one__form-btn">
              <button type="submit" className="thm-btn">
                Submit Now
                <i className="icon-right-arrow21"></i>
                <span className="hover-btn hover-bx"></span>
                <span className="hover-btn hover-bx2"></span>
                <span className="hover-btn hover-bx3"></span>
                <span className="hover-btn hover-bx4"></span>
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="result">
        {status?.message && <p>{status.message}</p>}
      </div>
    </>
  );
}


