import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Inicializar MercadoPago
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

app.get("/", (req, res) => {
  res.send("Servidor funcionando y MercadoPago configurado");
});

// Ruta para recibir la redirección de MercadoPago (success)
app.get("/success", (req, res) => {
  res.send({
    message: "Pago exitoso",
    query: req.query,
  });
});

// Ruta para crear la preferencia de pago
app.post("/create_preference", async (req, res) => {
  try {
    const { title, quantity, price } = req.body;
    if (!title || !quantity || !price) {
      return res.status(400).json({ error: "Faltan datos en la solicitud" });
    }

    const preferenceData = {
      items: [
        {
          title,
          quantity: Number(quantity),
          unit_price: Number(price),
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: "/success",
        failure: "/failure",
        pending: "",
      },
      auto_return: "approved",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body: preferenceData });
    console.log("Enlace de pago:", result.init_point);
    res.json({ id: result.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la preferencia" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
