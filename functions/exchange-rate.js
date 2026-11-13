

const FALLBACK_RATE = 1500;

const RATE_API_URL = "https://open.er-api.com/v6/latest/USD";

exports.handler = async function (event) {

  if (event.httpMethod !== "GET") {

    return {

      statusCode: 405,

      headers: { Allow: "GET" },

      body: JSON.stringify({

        error: "Method not allowed"

      })

    };

  }

  try {

    const response = await fetch(RATE_API_URL);

    if (!response.ok) {

      throw new Error("Exchange rate service unavailable");

    }

    const data = await response.json();

    const rate = data.rates?.NGN;

    if (

      data.result !== "success" ||

      typeof rate !== "number" ||

      !Number.isFinite(rate) ||

      rate <= 0

    ) {

      throw new Error("Invalid exchange rate");

    }

    return {

      statusCode: 200,

      headers: {

        "Content-Type": "application/json",

        "Cache-Control": "public, max-age=3600"

      },

      body: JSON.stringify({

        currency: "NGN",

        baseCurrency: "USD",

        rate,

        isLive: true,

        source: "exchange-rate-api",

        updatedAt: data.time_last_update_utc

      })

    };

  } catch (error) {

    console.error("Exchange rate error:", error);

    return {

      statusCode: 200,

      headers: {

        "Content-Type": "application/json",

        "Cache-Control": "no-store"

      },

      body: JSON.stringify({

        currency: "NGN",

        baseCurrency: "USD",

        rate: FALLBACK_RATE,

        isLive: false,

        source: "fallback",

        warning: "Live exchange rate unavailable"

      })

    };

  }

};