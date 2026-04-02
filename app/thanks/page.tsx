export default function ThanksPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "32px 16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #ffffff 0%, #dbeafe 50%, #bfdbfe 100%)",
      }}
    >
      <div
        style={{
          maxWidth: "720px",
          width: "100%",
          background: "rgba(255,255,255,0.9)",
          border: "1px solid rgba(255,255,255,0.7)",
          borderRadius: "28px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
          padding: "48px 32px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "56px" }}>✅</div>

        <p
          style={{
            marginTop: "16px",
            color: "#15803d",
            fontWeight: 600,
            fontSize: "14px",
          }}
        >
          RideX Motors
        </p>

        <h1
          style={{
            marginTop: "16px",
            fontSize: "42px",
            fontWeight: 900,
            color: "#111827",
          }}
        >
          Дякуємо за заявку!
        </h1>

        <p
          style={{
            marginTop: "20px",
            fontSize: "18px",
            lineHeight: 1.7,
            color: "#4b5563",
          }}
        >
          Ваше замовлення успішно оформлено. Найближчим часом ми зв’яжемося
          з вами для уточнення деталей.
        </p>

        <div
          style={{
            marginTop: "32px",
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="/catalog"
            style={{
              background: "#dc2626",
              color: "white",
              textDecoration: "none",
              padding: "14px 24px",
              borderRadius: "16px",
              fontWeight: 700,
            }}
          >
            Повернутись до каталогу
          </a>

          <a
            href="/"
            style={{
              background: "white",
              color: "#111827",
              textDecoration: "none",
              padding: "14px 24px",
              borderRadius: "16px",
              fontWeight: 700,
              border: "1px solid #d1d5db",
            }}
          >
            На головну
          </a>
        </div>
      </div>
    </main>
  );
}