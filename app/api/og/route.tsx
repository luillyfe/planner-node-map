import { ImageResponse } from "next/og";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: "linear-gradient(to bottom, #dbf4ff, #fff1f1)",
            padding: "40px",
          }}
        >
          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage:
                "radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 30%), radial-gradient(circle at 100% 100%, rgba(244, 63, 94, 0.1) 0%, transparent 30%)",
              zIndex: 0,
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
              width: "80%",
              gap: "20px",
              zIndex: 1,
            }}
          >
            {/* Top row */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "40px",
                marginBottom: "20px",
              }}
            >
              {/* TravelDatesTool */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(37, 99, 235, 0.1) 100%)",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(59, 130, 246, 0.1)",
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    background:
                      "linear-gradient(135deg, rgb(59, 130, 246), rgb(37, 99, 235))",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  📅
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "rgb(37, 99, 235)",
                    }}
                  >
                    TravelDatesTool
                  </div>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    Check calendar availability for the trip
                  </div>
                </div>
              </div>

              {/* FlightSearchTool - with purple gradient */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(79, 70, 229, 0.1) 100%)",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(99, 102, 241, 0.1)",
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Similar structure for FlightSearchTool */}
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    background:
                      "linear-gradient(135deg, rgb(99, 102, 241), rgb(79, 70, 229))",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  ✈️
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "rgb(79, 70, 229)",
                    }}
                  >
                    FlightSearchTool
                  </div>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    Search for available flights to Paris
                  </div>
                </div>
              </div>

              {/* FlightComparatorTool - with violet gradient */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(124, 58, 237, 0.1) 100%)",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(139, 92, 246, 0.1)",
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Similar structure for FlightComparatorTool */}
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    background:
                      "linear-gradient(135deg, rgb(139, 92, 246), rgb(124, 58, 237))",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  ⚖️
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "rgb(124, 58, 237)",
                    }}
                  >
                    FlightComparatorTool
                  </div>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    Compare and rank flight options
                  </div>
                </div>
              </div>
            </div>

            {/* Middle section */}
            <div
              style={{
                display: "flex",
                gap: "40px",
                justifyContent: "space-between",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              {/* HotelSearchTool - with orange gradient */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(249, 115, 22, 0.05) 0%, rgba(234, 88, 12, 0.1) 100%)",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(249, 115, 22, 0.1)",
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Similar structure for other tools */}
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    background:
                      "linear-gradient(135deg, rgb(249, 115, 22), rgb(234, 88, 12))",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  🔍
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "rgb(234, 88, 12)",
                    }}
                  >
                    HotelSearchTool
                  </div>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    Search for available hotels in Paris
                  </div>
                </div>
              </div>

              {/* FlightBookingTool - with rose gradient */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(244, 63, 94, 0.05) 0%, rgba(225, 29, 72, 0.1) 100%)",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(244, 63, 94, 0.1)",
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Similar structure for FlightBookingTool */}
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    background:
                      "linear-gradient(135deg, rgb(244, 63, 94), rgb(225, 29, 72))",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  🏷️
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "rgb(225, 29, 72)",
                    }}
                  >
                    FlightBookingTool
                  </div>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    Book the selected flight
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "40px",
                marginTop: "20px",
              }}
            >
              {/* HotelComparatorTool - with yellow gradient */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(234, 179, 8, 0.05) 0%, rgba(202, 138, 4, 0.1) 100%)",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(234, 179, 8, 0.1)",
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    background:
                      "linear-gradient(135deg, rgb(234, 179, 8), rgb(202, 138, 4))",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  ⭐
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "rgb(202, 138, 4)",
                    }}
                  >
                    HotelComparatorTool
                  </div>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    Compare and rank hotel options
                  </div>
                </div>
              </div>

              {/* HotelBookingTool - with green gradient */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(22, 163, 74, 0.1) 100%)",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(34, 197, 94, 0.1)",
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    background:
                      "linear-gradient(135deg, rgb(34, 197, 94), rgb(22, 163, 74))",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  🏨
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "rgb(22, 163, 74)",
                    }}
                  >
                    HotelBookingTool
                  </div>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    Book the selected hotel
                  </div>
                </div>
              </div>

              {/* EmailConfirmationTool - with cyan gradient */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(8, 145, 178, 0.1) 100%)",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(6, 182, 212, 0.1)",
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    background:
                      "linear-gradient(135deg, rgb(6, 182, 212), rgb(8, 145, 178))",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  ✉️
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "rgb(8, 145, 178)",
                    }}
                  >
                    EmailConfirmationTool
                  </div>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    Send booking confirmation email
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: await fs.readFile(
              path.join(process.cwd(), "public/fonts/Inter-Regular.ttf")
            ),
            style: "normal",
            weight: 400,
          },
          {
            name: "Inter",
            data: await fs.readFile(
              path.join(process.cwd(), "public/fonts/Inter-Bold.ttf")
            ),
            style: "normal",
            weight: 700,
          },
        ],
      }
    );
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new NextResponse("Error generating image", { status: 500 });
  }
}
